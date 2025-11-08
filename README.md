# User Stories – TV Series Tracker

## **US01 – Registro de Usuário**

**User Story:**  
Como um novo usuário,  
eu quero me registrar no sistema,  
para que eu possa criar minha conta e acompanhar as séries que assisto.  

**Regras de Negócio:**  
- O e-mail deve ser único (não pode haver duplicidade de usuário).  
- A senha deve conter no mínimo 8 caracteres, incluindo letras e números.  

---

## **US02 – Login de Usuário**

**User Story:**  
Como um usuário cadastrado,  
eu quero fazer login no sistema,  
para que eu possa acessar minha conta e ver minhas séries registradas.  

**Regras de Negócio:**  
- O sistema deve validar e-mail e senha antes de conceder acesso.  

---

## **US03 – Registro de Série**

**User Story:**  
Como um usuário autenticado,  
eu quero registrar uma nova série,  
para que eu possa acompanhar o progresso das séries que estou assistindo.  

**Regras de Negócio:**  
- Os campos obrigatórios são: nome da série, data de início e status.  
- O status inicial do status pode ser: *Não Iniciada*, *Assistindo* ou *Finalizada*.  

---

## **US04 – Atualizar Informações da Série**

**User Story:**  
Como um usuário autenticado,  
eu quero editar as informações de uma série cadastrada,  
para que eu possa corrigir dados ou atualizar o status conforme meu progresso.  

**Regras de Negócio:**  
- Só o proprietário do registro pode atualizar a série.  
- É possível alterar qualquer campo (nome, data de início, data de término, status). 

---

## **US05 – Visualizar Lista de Séries**

**User Story:**  
Como um usuário autenticado,  
eu quero ver a lista de todas as séries que registrei,  
para que eu possa acompanhar meu histórico e progresso.  

**Regras de Negócio:**  
- A lista deve exibir nome, status, data de início e data de término.
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
