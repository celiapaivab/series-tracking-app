# Testes automatizados de API REST

## Como executar

- Para rodar os testes:

```
npm test
```

- Para rodar os testes e gerar relatório HTML:

```
npm run test:html
```

O relatório será gerado na pasta `mochawesome-report`.

## Estrutura

- Os testes estão em `test/` separados por funcionalidade
- Dados de teste estão em `fixtures/` para Data Driven Testing
- Variáveis de ambiente estão em `.env`
- Hooks são usados para obter token JWT e reaproveitar código
