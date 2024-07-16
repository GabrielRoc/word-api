<h1 align="center">Word API</h1>
<p align="center">API para consulta de palavras e seus significados através da Free Dictionary API</p>

<p align="center">
  <img href="https://nestjs.com/" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" target="_blank">
  <img href="https://www.postgresql.org/" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" target="_blank">
  <img href="https://www.sqlite.org/index.html" src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white" target="_blank">
  <img href="https://jestjs.io/pt-BR/" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" target="_blank">
</p>

## Descrição

Implementação de um back-end para fazer uma interface a Free Dictionary API. Descrição completa [aqui](https://github.com/reloadfloraenergia/TechTests)

## Instalação

```bash
# setting up environment variables file
$ cp .env.example .env

# installing dependencies
$ pnmp install
```

### Enviroment

```
TYPEORM_HOST= host do banco de dados PostgreSQL

TYPEORM_USERNAME= username do banco de dados PostgreSQL

TYPEORM_PASSWORD= senha do banco de dados PostgreSQL

TYPEORM_DATABASE= database do banco de dados PostgreSQL

TYPEORM_PORT= porta do banco de dados PostgreSQL

TYPEORM_SYNCHRONIZE= se o banco deve ser sincronizado com a aplicação (true/false)

TYPEORM_LOGGING= se deve ser loggado todas as operações SQL (true/false)



REDIS_HOST= host do banco de dados Redis

REDIS_PORT= porta do banco de dados Redis

REDIS_TTL= tempo de vida dos itens do banco de dados Redis

REDIS_PASSWORD= senha  do banco de dados Redis (se houver)



WORD_PROVIDER_URL= URL da Free Dictionary API (https://api.dictionaryapi.dev/api/v2/)



PORT= porta em que o projeto irá rodar

TZ= timezone da aplicação

JWT_SECRET= segredo para tokens JWT da aplicação

JWT_EXPIRATION_TIME= tempo em segundos para expiração do token

NODE_ENV= enviroment da aplicação (devlopment/production)
```

## Execução

```bash
# development
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Testes

```bash
# e2e tests
$ pnpm run test:e2e
```

## Informações

<ul>
  <li><a href="https://app.swaggerhub.com/apis-docs/gr.solucoes/word-api/1.0">Swagger</a></li>
  <li><a href="https://dictionaryapi.dev/">Free Dictionary API</a></li>
</ul>

## TO-DO

- [ ] Testes automatizados
- [ ] Corrigir interceptor do cache (apesar de funcionar normalmente, sempre aponta um HIT)
- [ ] Configurar Dockerfile
- [ ] Configurar CI/CD
