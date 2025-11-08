# Series Tracking App

## Descrição

API REST para acompanhamento de séries assistidas, permitindo registro e autenticação de usuários, cadastro e gerenciamento de séries, e visualização do histórico pessoal.

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
