<?php

namespace Tests\Feature;

use Tests\TestCase;

class RevisaoFluxoPadraoTest extends TestCase
{
    /**
     * Fluxo do README (composer install, cp .env.example .env, key:generate, serve) usa
     * SESSION_DRIVER=database sem migrar: a home estatica deve responder 200 mesmo assim.
     */
    public function test_home_responde_200_com_sessao_em_banco_sem_migrar(): void
    {
        $this->markTestSkipped('Obsoleto (3a revisao): o .env.example passou a usar SESSION_DRIVER=file/CACHE_STORE=file; coberto por Revisao3Test::test_home_com_drivers_do_env_example_nao_toca_no_banco.');
        config(['session.driver' => 'database', 'cache.default' => 'database']);
        $this->withoutVite();

        $this->get('/')->assertOk();
    }
}
