# Calculadora de Investimento para Programadores

Aplicação **Java 27** com **Spring Boot 4.1** que serve o front-end em **React + TypeScript** (Vite + Tailwind).

## Requisitos
- JDK 27 (ex.: [Eclipse Temurin 27](https://adoptium.net/temurin/releases/?version=27))
- Node.js e npm

O Maven não precisa estar instalado: use o wrapper `./mvnw` (ou `mvnw.cmd` no Windows).

## Estrutura
```
index.html                 # página do Vite (meta tags de SEO + ponto de entrada do React)
public/                    # arquivos estáticos copiados como estão para o build (favicon, robots.txt...)
src/main/frontend/js       # código React (alias "@/")
src/main/frontend/css      # CSS global (Tailwind)
src/main/java              # aplicação Spring Boot
src/main/resources/static  # build do front gerado pelo Vite (não versionado)
```

A calculadora não usa banco de dados nem APIs: o Spring Boot apenas serve o build estático do front
(`/` entrega o `index.html`).

## Instalação
```bash
npm install
```

## Desenvolvimento
```bash
npm run dev          # Vite com HMR em http://localhost:5173
```

Para rodar pelo Spring Boot (porta 8080), gere o front antes:
```bash
npm run build        # typecheck (tsc) + build para src/main/resources/static
./mvnw spring-boot:run
```

## Build / testes
```bash
npm run build        # sempre antes do pacote Java, para incluir o front no jar
./mvnw test
./mvnw package       # gera target/calculadora-0.0.1-SNAPSHOT.jar
java -jar target/calculadora-0.0.1-SNAPSHOT.jar
```
