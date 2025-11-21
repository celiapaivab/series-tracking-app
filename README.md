# Series Tracking App

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?logo=mocha&logoColor=white&style=flat)
![Chai](https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=white&style=flat)
![Supertest](https://img.shields.io/badge/Supertest-333?style=flat)
![K6](https://img.shields.io/badge/K6-7D64FF?logo=k6&logoColor=white&style=flat)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=white&style=flat)

## Descrição

API REST para acompanhamento de séries assistidas, permitindo registro e autenticação de usuários, cadastro e gerenciamento de séries, e visualização do histórico pessoal.

## Estrutura do Projeto

```
├── app.js
├── CondicoesDeTeste.txt
├── Heurísticas.txt
├── package.json
├── README.md
├── controllers/   # Lógica dos endpoints da API
├── middleware/    # Funções intermediárias (ex: autenticação)
├── model/         # Modelos e acesso a dados
├── resources/     # Recursos estáticos e documentação
├── routes/        # Definição das rotas da API
├── service/       # Regras de negócio da aplicação
├── test/          # Testes automatizados
│   ├── fixtures/   # Dados de exemplo para testes
│   │   ├── login.json
│   │   ├── register.json
│   │   └── series.json
│   ├── helpers/    # Funções auxiliares para testes
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── email.js
│   │   └── serie.js
│   ├── k6/         # Testes de performance
│   │   ├── base.config.js
│   │   └── registro-usuario/
│   │       └── register-user.k6.js
│   └── tests/      # Testes funcionais (Mocha/Chai)
│       ├── login.test.js
│       ├── register.test.js
│       ├── series.test.js
│       ├── seriesDelete.test.js
│       ├── seriesList.test.js
│       └── seriesUpdate.test.js
```

## Funcionalidades

- Registro de usuário
- Login de usuário
- Registro de série (nome, data de início, data de término, status)
- Atualização de informações da série
- Visualização da lista de séries do usuário
- Exclusão de série

## Arquitetura

- **Express** para construção da API REST
- **JWT** para autenticação
- **Swagger** para documentação
- **Banco de dados em memória** para armazenamento dos dados
- Camadas separadas: routes, controllers, service, model

## Autenticação

- Registro e login de usuário geram um token JWT
- Endpoints de séries exigem autenticação via token
- Apenas o proprietário pode editar ou excluir suas séries

## Documentação

A documentação da API está disponível via Swagger no endpoint `/api-docs`.

## Como executar

1. Instale as dependências: `npm install`
2. Inicie o servidor: `npm start`
3. Acesse a documentação Swagger em `http://localhost:3000/api-docs`

## Testes Funcionais

Os testes funcionais garantem o correto funcionamento dos principais fluxos da API (registro, login, cadastro, atualização, listagem e exclusão de séries).

- **Tecnologias utilizadas:** Mocha, Chai, Supertest
- **Localização:** `test/tests/`
- **Como executar:**
  - Execute todos os testes: `npm test`
  - Para relatório em HTML: `npm run test:report` (resultado em `mochawesome-report`)

## Testes de Performance

Os testes de performance avaliam o tempo de resposta e a estabilidade da API sob carga, utilizando o K6.

- **Tecnologia utilizada:** K6
- **Localização:** `test/k6/`
- **Como executar:**
  - Instale o K6 globalmente: `npm install -g k6` ou via [site oficial](https://k6.io/docs/getting-started/installation/)
  - Execute o teste de registro de usuário:
    ```sh
    k6 run test/k6/registro-usuario/register-user.k6.js
    ```
  - O teste simula múltimos usuários registrando-se simultaneamente e verifica tempo de resposta e sucesso.

## Resumo dos Testes

- Testes funcionais cobrem todos os requisitos de negócio descritos nas User Stories.
- Testes de performance avaliam o endpoint de registro sob carga (30 usuários simultâneos por 60 segundos, resposta < 200ms).

## User Stories e Regras de Negócio

## **US01 – Registro de Usuário**

**User Story:**  
Como um novo usuário,  
eu quero me registrar no sistema,  
para que eu possa criar minha conta e acompanhar as séries que assisto.

**Regras de Negócio:**

- O e-mail deve ser único (não pode haver duplicidade de usuário).
- Todos os campos obrigatórios devem ser preenchidos.
- A senha deve conter no mínimo 8 caracteres, incluindo letras e números.

---

## **US02 – Login de Usuário**

**User Story:**  
Como um usuário cadastrado,  
eu quero fazer login no sistema,  
para que eu possa acessar minha conta e ver minhas séries registradas.

**Regras de Negócio:**

- O usuário deve ter sido registrado anteriormente.
- Todos os campos obrigatórios devem ser preenchidos.

---

## **US03 – Registro de Série**

**User Story:**  
Como um usuário autenticado,  
eu quero registrar uma nova série,  
para que eu possa acompanhar o progresso das séries que estou assistindo.

**Regras de Negócio:**

- Os campos obrigatórios são: nome da série, data de início e status.
- O status inicial do status pode ser: _Não Iniciada_, _Assistindo_ ou _Finalizada_.
- Apenas usuário logado pode registrar uma série.

---

## **US04 – Atualizar Informações da Série**

**User Story:**  
Como um usuário autenticado,  
eu quero editar as informações de uma série cadastrada,  
para que eu possa corrigir dados ou atualizar o status conforme meu progresso.

**Regras de Negócio:**

- Só o proprietário do registro pode atualizar a série.
- É possível alterar qualquer campo (nome, data de início, data de término, status).
- Caso o status seja alterado para _Finalizada_, a data de término deve ser obrigatória.

---

## **US05 – Visualizar Lista de Séries**

**User Story:**  
Como um usuário autenticado,  
eu quero ver a lista de todas as séries que registrei,  
para que eu possa acompanhar meu histórico e progresso.

**Regras de Negócio:**

- A lista deve exibir nome, status, data de início e data de término.
- As séries devem ser exibidas em ordem decrescente de data de início, por padrão.
- A lista deve ser carregada apenas com as séries pertencentes ao usuário logado.

---

## **US06 – Deletar Série**

**User Story:**  
Como um usuário autenticado,  
eu quero poder excluir uma série da minha lista,  
para que eu possa remover registros que não desejo mais acompanhar.

**Regras de Negócio:**

- O usuário só pode deletar séries que ele mesmo registrou.
- A exclusão deve ser permanente e refletida imediatamente na lista.

---
