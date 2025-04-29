# BASE Exchange Take Home Assignment - Order Management Module

Este é o módulo de **Gerenciamento de Ordens** da plataforma BASE Exchange. O objetivo é desenvolver uma aplicação front-end para visualização, criação, e cancelamento de ordens de ativos financeiros, com uma API mockada e cobertura de testes.

## Iniciando o Projeto

Primeiro, inicie o servidor de desenvolvimento:

```bash
yarn dev
```

Abra o caminho [http://localhost:3000](http://localhost:3000) com o seu browser para ver a aplicação.

## 🛠️ Tecnologias

- [Next.js 15 (Page Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Testing Library](https://testing-library.com/)
- [Jest](https://jestjs.io/)

---

# 🧠 Regras de Casamento de Ordens

Este projeto simula um mecanismo simples de **casamento de ordens (matching)** para um sistema de negociações do tipo livro de ofertas (_order book_), similar aos utilizados em bolsas de valores.

---

## 📌 Conceito Básico

Uma **ordem** pode ser de dois tipos:

- **Compra (Bid)**
- **Venda (Ask)**

As ordens só casam se forem de **ativos iguais**, com **lados opostos**, **status 'Aberta'**, e **preço compatível**.

---

## ✅ Casamento de Ordens

### ➕ Quando acontece?

O _matching_ ocorre quando:

- O **ativo** é igual.
- As ordens são de **lados opostos** (`Compra` x `Venda`).
- Ambas estão com status **Aberta** ou **Parcial**.
- O preço da nova ordem é **competitivo** em relação à contraparte.

| Ordem Atual     | Contraparte Existente | Resultado             |
| --------------- | --------------------- | --------------------- |
| Compra R$ 30,00 | Venda R$ 29,00        | ✅ Casa (30 >= 29)    |
| Venda R$ 28,00  | Compra R$ 28,45       | ✅ Casa (28 <= 28,45) |
| Compra R$ 27,00 | Venda R$ 28,00        | ❌ Não casa           |
| Venda R$ 30,00  | Compra R$ 28,00       | ❌ Não casa           |

---

## 📦 Status das Ordens

| Status        | Descrição                                                                 |
| ------------- | ------------------------------------------------------------------------- |
| **Aberta**    | A ordem está disponível para matching.                                    |
| **Executada** | Ordem totalmente atendida (quantidade 100%).                              |
| **Parcial**   | Parte da ordem foi atendida. O restante ainda está aberto.                |
| **Cancelada** | Ordem foi cancelada manualmente e não está mais disponível para matching. |

---

## 🔁 Lógica de Matching

### 🔹 Quando a quantidade é IGUAL:

```javascript
Ordem Nova: { amount: 100 }
Contraparte: { amountLeft: 100 }
➡ Ambas marcadas como Executada
```

### 🔹 Quando a nova ordem tem quantidade MAIOR:

```javascript
Ordem Nova: { amount: 200 }
Contraparte: { amountLeft: 100 }
➡ Contraparte: Executada
➡ Nova ordem: Parcial (amountLeft = 100)
```

### 🔹 Quando a nova ordem tem quantidade MENOR:

```javascript
Ordem Nova: { amount: 50 }
Contraparte: { amountLeft: 150 }
➡ Nova ordem: Executada
➡ Contraparte: Parcial (amountLeft = 100)
```

---

## 📉 Exemplo de Falha de Matching

```javascript
// Situação: Ordem de venda tentando casar com ordem de compra existente
Nova Ordem:
{ asset: 'PETR4', side: 'Venda', price: 'R$ 29,00', amount: 100 }

Ordem no livro:
{ asset: 'PETR4', side: 'Compra', price: '28,45', amount: 100 }

➡ ❌ Não casa. Motivo: 29,00 > 28,45 (vendedor está pedindo caro)
```

---

## ✅ Exemplo de Matching Correto

```javascript
Nova Ordem:
{ asset: 'PETR4', side: 'Venda', price: 'R$ 28,00', amount: 100 }

Ordem no livro:
{ asset: 'PETR4', side: 'Compra', price: '28,45', amount: 100 }

➡ ✅ Casa com sucesso!
```

---

## ✅ To-Do

### Etapa 0: Setup Inicial

- [x] Criar projeto com Next.js 15 + TypeScript
- [x] Configurar ESLint, Prettier e TailwindCSS
- [x] Configurar Commitlint, Husky e Commitizen
- [x] Instalar libs: `clsx`, `zod`, `react-hook-form`, `shadcn/ui`
- [x] Criar estrutura inicial de pastas (`/app`, `/components`, `/mocks`, `/types`, `lib`, etc)

---

### Etapa 1: Mock de API

- [x] `GET /orders`: listagem de ordens
- [x] `GET /orders/:id`: detalhes da ordem
- [x] `GET /orders/:id/history`: histórico de status
- [x] `POST /orders`: criação de ordem
- [x] `PATCH /orders/:id/cancel`: cancelamento de ordem
- [x] Lógica de execução: atualizar status e quantidade se houver contraparte

---

### Etapa 2: Visualização de Ordens

- [x] Criar página `/app/orders/page.tsx`
- [x] Criar `OrderTable` com colunas: ID, Instrumento, Lado, Preço, Quantidade, Restante, Status, Data/Hora
- [x] Filtros: ID, instrumento, status, lado, data
- [x] Ordenação e paginação
- [x] Componentes auxiliares (Badges, Filtros, Forms)

---

### Etapa 3: Detalhes da Ordem

- [x] Criar página `/app/order/[id]/page.tsx`
- [x] Renderizar dados completos da ordem
- [x] Mostrar histórico de status
- [x] Adicionar botão de cancelamento (condicional)
- [x] Modal de confirmação

---

### Etapa 4: Criação de Ordem

- [x] Criar página `/app/create-order/page.tsx`
- [x] Criar formulário com validações usando Zod
- [x] Campos: Instrumento, Lado, Preço, Quantidade
- [x] Status padrão: "Aberta"

---

### Etapa 5: Cancelamento de Ordem

- [x] Botão visível somente para status "Aberta" ou "Parcial"
- [x] Exibir modal de confirmação
- [x] Atualizar status para "Cancelada"
- [x] Atualizar listagem

---

### Etapa 6: Lógica de Execução (Mock)

- [x] Implementar no mock a simulação de contraparte
- [x] Atualizar status de ordens: "Executada", "Parcial"
- [x] Manter histórico atualizado
- [x] Atualizar quantidade restante corretamente

---

### Etapa 7: Testes Automatizados

- [x] Configurar Testing Library + Jest
- [x] Testes unitários

---

### Etapa 8: QA Final

- [x] Tratar erros de rede/API simulados
- [x] Garantir acessibilidade básica
- [x] Responsividade nos principais breakpoints

---

## 🏁 Resultado esperado

Uma aplicação funcional com gerenciamento completo de ordens e lógica de execução, com testes automatizados e API simulada.

---
