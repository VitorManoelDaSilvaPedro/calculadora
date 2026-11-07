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
        config(['session.driver' => 'database', 'cache.default' => 'database']);
        $this->withoutVite();

        $this->get('/')->assertOk();
    }
}
