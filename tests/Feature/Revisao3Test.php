<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

/**
 * Testes adversariais da 3a revisao (tarefa 3af24870 - Mudar para PHP).
 */
class Revisao3Test extends TestCase
{
    public function test_home_com_drivers_do_env_example_nao_toca_no_banco(): void
    {
        // Replica os drivers do .env.example (file/file/sync), e nao os do phpunit.xml (array).
        config([
            'session.driver' => 'file',
            'cache.default' => 'file',
            'queue.default' => 'sync',
            'database.connections.sqlite.database' => '/caminho/inexistente/database.sqlite',
        ]);
        $this->withoutVite();

        $queries = 0;
        DB::listen(function () use (&$queries) {
            $queries++;
        });

        $this->get('/')->assertOk()->assertSee('id="root"', false);
        $this->assertSame(0, $queries, 'A home nao deveria executar queries.');
    }

    public function test_env_example_nao_depende_de_banco(): void
    {
        $env = File::get(base_path('.env.example'));
        $this->assertMatchesRegularExpression('/^SESSION_DRIVER=file$/m', $env);
        $this->assertMatchesRegularExpression('/^CACHE_STORE=file$/m', $env);
        $this->assertMatchesRegularExpression('/^QUEUE_CONNECTION=sync$/m', $env);
    }

    public function test_view_mantem_seo_e_lang_pt_br(): void
    {
        $this->withoutVite();
        $this->get('/')
            ->assertOk()
            ->assertSee('<html lang="pt-BR">', false)
            ->assertSee('Calculadora de Investimento para Programadores', false)
            ->assertSee('rel="canonical"', false)
            ->assertSee('/vite.svg', false);
        $this->assertFileExists(public_path('vite.svg'));
    }

    public function test_health_check_responde(): void
    {
        $this->get('/up')->assertOk();
    }

    public function test_rota_inexistente_404_sem_vazar_detalhes_em_producao(): void
    {
        config(['app.debug' => false]);
        $r = $this->get('/nao-existe/../../etc/passwd');
        $this->assertContains($r->status(), [404, 400]);
        $r->assertDontSee('vendor/laravel', false)->assertDontSee('Stack trace', false);
    }

    public function test_post_na_home_nao_e_aceito(): void
    {
        $this->withoutVite();
        $this->post('/')->assertStatus(405);
    }

    public function test_query_maliciosa_nao_e_refletida(): void
    {
        $this->withoutVite();
        $this->get('/?q=<script>alert(1)</script>&x=%27%20OR%201=1--')
            ->assertOk()
            ->assertDontSee('<script>alert(1)</script>', false)
            ->assertDontSee("' OR 1=1", false);
    }

    public function test_arquivos_sensiveis_nao_estao_em_public(): void
    {
        foreach (['.env', 'composer.json', '.env.example'] as $f) {
            $this->assertFileDoesNotExist(public_path($f));
        }
        $this->get('/.env')->assertNotFound();
        $this->get('/composer.json')->assertNotFound();
    }

    public function test_view_com_vite_real_aponta_para_entradas_do_manifest(): void
    {
        $manifest = public_path('build/manifest.json');
        if (! File::exists($manifest)) {
            $this->markTestSkipped('Rode npm run build antes.');
        }
        $m = json_decode(File::get($manifest), true);
        $this->assertArrayHasKey('resources/js/main.tsx', $m);
        $this->assertArrayHasKey('resources/css/app.css', $m);

        $html = $this->get('/')->assertOk()->getContent();
        $this->assertStringContainsString('/build/'.$m['resources/js/main.tsx']['file'], $html);
        $this->assertFileExists(public_path('build/'.$m['resources/js/main.tsx']['file']));
    }

    public function test_logica_da_calculadora_foi_movida_sem_alteracao(): void
    {
        $this->assertFileExists(resource_path('js/lib/calculator.ts'));
        $this->assertDirectoryDoesNotExist(base_path('src'));
        $this->assertFileDoesNotExist(base_path('index.html'));
    }
}
