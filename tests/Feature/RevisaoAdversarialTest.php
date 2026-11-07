<?php

namespace Tests\Feature;

use Tests\TestCase;

class RevisaoAdversarialTest extends TestCase
{
    public function test_home_renderiza_em_checkout_limpo_sem_build_do_vite(): void
    {
        $this->markTestSkipped('Obsoleto (3a revisao): sem npm run build o @vite real falha por design; o teste do PR usa withoutVite() e o README exige o build. Ver 2a revisao, item 2.');
        // Simula clone limpo: public/build ausente. Deve renderizar mesmo assim (ou o teste deve fazer o build/fake).
        $this->assertFileDoesNotExist(public_path('build/manifest.json'), 'rode com public/build removido');
        $this->get('/')->assertOk();
    }

    public function test_home_tem_seo_e_root_com_vite_fake(): void
    {
        $this->withoutVite();
        $this->get('/')->assertOk()
            ->assertSee('<title>Calculadora de Investimento', false)
            ->assertSee('lang="pt-BR"', false)
            ->assertSee('id="root"', false);
    }

    public function test_rota_inexistente_retorna_404_sem_vazar_detalhes(): void
    {
        $this->withoutVite();
        $this->get('/nao-existe')->assertNotFound()->assertDontSee('vendor/laravel');
    }

    public function test_metodo_invalido_retorna_405(): void
    {
        $this->withoutVite();
        $this->post('/')->assertStatus(405);
    }

    public function test_query_maliciosa_nao_e_refletida(): void
    {
        $this->withoutVite();
        $this->get('/?q=<script>alert(1)</script>')->assertOk()->assertDontSee('<script>alert(1)</script>', false);
    }

    public function test_env_e_dotfiles_nao_sao_servidos(): void
    {
        $this->withoutVite();
        $this->get('/.env')->assertNotFound();
        $this->get('/../.env')->assertStatus(404);
    }
}
