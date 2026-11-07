<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_a_calculadora_e_renderizada_na_pagina_inicial(): void
    {
        $this->withoutVite();

        $this->get('/')->assertOk()->assertSee('id="root"', false);
    }
}
