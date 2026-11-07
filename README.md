# Calculadora de Investimento para Programadores

Aplicação **Laravel 13** (PHP 8.3+) que serve o front-end em **React + TypeScript** (Vite + Tailwind),
integrado via `laravel-vite-plugin`.

## Requisitos
- PHP ^8.3 e Composer
- Node.js e npm

## Instalação
```bash
composer install
cp .env.example .env
php artisan key:generate
npm install
```

A calculadora não usa banco de dados: o `.env.example` já vem com `SESSION_DRIVER=file`,
`CACHE_STORE=file` e `QUEUE_CONNECTION=sync`, então não é preciso rodar `php artisan migrate`.
Se trocar esses drivers para `database`, crie o banco e rode `php artisan migrate` antes de subir a aplicação.

## Desenvolvimento
```bash
php artisan serve   # backend em http://localhost:8000
npm run dev         # Vite com HMR
```

## Build / testes
```bash
npm run build       # typecheck (tsc) + build para public/build
php artisan test
```

O código React fica em `resources/js`, o CSS em `resources/css/app.css` e a view Blade em `resources/views/app.blade.php`.
