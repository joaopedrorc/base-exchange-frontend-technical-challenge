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
- [Mock Service Worker (MSW)](https://mswjs.io/) ou [json-server](https://github.com/typicode/json-server)
- [faker.js](https://fakerjs.dev/)
- [Testing Library](https://testing-library.com/)

---

## ✅ To-Do

### Etapa 0: Setup Inicial

- [x] Criar projeto com Next.js 15 + TypeScript
- [x] Configurar ESLint, Prettier e TailwindCSS
- [x] Configurar Commitlint, Husky e Commitizen
- [ ] Instalar libs: `clsx`, `zod`, `react-hook-form`, `shadcn/ui`
- [ ] Criar estrutura inicial de pastas (`/app`, `/components`, `/mocks`, `/types`, etc)

---

### Etapa 1: Mock de API

- [ ] Configurar mock com MSW ou mocks locais
- [x] `GET /orders`: listagem de ordens
- [ ] `GET /orders/:id`: detalhes da ordem
- [ ] `GET /orders/:id/history`: histórico de status
- [ ] `POST /orders`: criação de ordem
- [ ] `POST /orders/:id/cancel`: cancelamento de ordem
- [ ] Lógica de execução: atualizar status e quantidade se houver contraparte

---

### Etapa 2: Visualização de Ordens

- [x] Criar página `/app/orders/page.tsx`
- [x] Criar `OrderTable` com colunas: ID, Instrumento, Lado, Preço, Quantidade, Restante, Status, Data/Hora
- [x] Filtros: ID, instrumento, status, lado, data
- [x] Ordenação e paginação
- [ ] Componentes auxiliares (Badges, Filtros, Skeletons)

---

### Etapa 3: Detalhes da Ordem

- [ ] Criar página `/app/orders/[id]/page.tsx`
- [ ] Renderizar dados completos da ordem
- [ ] Mostrar histórico de status
- [ ] Adicionar botão de cancelamento (condicional)
- [ ] Modal de confirmação

---

### Etapa 4: Criação de Ordem

- [ ] Criar página `/app/orders/create/page.tsx`
- [ ] Criar formulário com validações usando Zod
- [ ] Campos: Instrumento, Lado, Preço, Quantidade
- [ ] Status padrão: "Aberta"
- [ ] Redirecionar após criação

---

### Etapa 5: Cancelamento de Ordem

- [ ] Botão visível somente para status "Aberta" ou "Parcial"
- [ ] Exibir modal de confirmação
- [ ] Atualizar status para "Cancelada"
- [ ] Atualizar listagem

---

### Etapa 6: Lógica de Execução (Mock)

- [ ] Implementar no mock a simulação de contraparte
- [ ] Atualizar status de ordens: "Executada", "Parcial"
- [ ] Manter histórico atualizado
- [ ] Atualizar `quantidadeRestante` corretamente

---

### Etapa 7: Testes Automatizados

- [ ] Configurar Testing Library + Jest
- [ ] Testes unitários: `OrderTable`, `OrderForm`, `OrderDetails`
- [ ] Testes de integração: criação, cancelamento e listagem
- [ ] Testes de mocks com MSW

---

### Etapa 8: QA Final

- [ ] Tratar erros de rede/API simulados
- [ ] Garantir acessibilidade básica
- [ ] Responsividade nos principais breakpoints
- [ ] (Opcional) Deploy via Vercel

---

## 🏁 Resultado esperado

Uma aplicação funcional com gerenciamento completo de ordens e lógica de execução, com testes automatizados e API simulada.

---
