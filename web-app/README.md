# 🛍️ Sistema de Contratação de Serviços - Web

Este projeto é a versão web do **ecossistema de contratação de serviços**, desenvolvido com Next.js 14. A aplicação oferece uma interface moderna e responsiva para gerenciar e contratar serviços.

## 🎯 Objetivo

Demonstrar uma arquitetura moderna e escalável para aplicações web com:

- 🌐 Next.js 14 com App Router
- 📱 Design responsivo com Tailwind CSS
- ✅ Validação de formulários
- 🔄 Gerenciamento de estado e cache com React Query
- 🎨 UI moderna com Shadcn/ui

## ✅ Funcionalidades Implementadas

### 🛍️ **Gestão de Serviços**

- **Listagem** de serviços disponíveis
- **Cadastro** de novos serviços
- **Contratação** de serviços
- **Exclusão** de serviços

### 📝 **Formulários**

- **Validação** robusta de campos
- Interface intuitiva e feedback visual
- Integração com backend

## 🚀 **Como usar**

### 1️⃣ Configuração Inicial

```bash
# Clonar o repositório
git clone [URL_DO_REPOSITÓRIO]
cd web-app

# Instalar dependências
npm install
```

### 2️⃣ Backend (JSON Server)

```bash
# Rodar o JSON Server
npm run json-server
```

O backend estará disponível em: `http://localhost:3002`

Endpoints disponíveis:

**Serviços:**

- `GET    /services` - Listar todos os serviços
- `GET    /services/:id` - Buscar serviço por ID
- `POST   /services` - Criar novo serviço
- `DELETE /services/:id` - Excluir serviço
- `PATCH  /services/:id` - Atualizar serviço

### 3️⃣ Frontend Web

```bash
# Em outro terminal, inicie a aplicação web
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

> 💡 **Importante**:
>
> - Mantenha o servidor JSON Server rodando em um terminal separado
> - Para desenvolvimento, certifique-se de que as portas 3000 e 3001 estão disponíveis

## 📱 **Páginas**

1. **🏠 Home** - Listagem de serviços
2. **➕ Novo Serviço** - Cadastro de serviços

## 📁 Estrutura do Projeto

```
web-app/
├── src/
│ ├── app/ # App Router (Next.js)
│ │ ├── services/ # Rotas de serviços
│ │ │ ├── new/ # Cadastro de serviço
│ │ │ └── page.tsx # Listagem de serviços
│ │ ├── globals.css # Estilos globais
│ │ ├── layout.tsx # Layout principal
│ │ └── page.tsx # Página inicial
│ │
│ ├── components/ # Componentes da UI
│ │ ├── layout/ # Componentes de layout
│ │ │ └── ui/ # Componentes base
│ │ │     ├── alert.tsx
│ │ │     ├── button.tsx
│ │ │     ├── dialog.tsx
│ │ │     ├── form.tsx
│ │ │     └── ... # Outros componentes base
│ │ └── services/ # Componentes específicos
│ │     ├── form/ # Formulários de serviço
│ │     ├── service-card.tsx
│ │     ├── service-form.tsx
│ │     └── service-list.tsx
│ │
│ ├── config/ # Configurações
│ │ └── api.ts # Configuração da API
│ │
│ ├── domain/ # Regras de negócio
│ │ └── services/ # Lógica de serviços
│ │     ├── operations/ # Operações de serviço
│ │     ├── schemas.ts # Schemas de validação
│ │     └── Service.ts # Tipos e interfaces
│ │
│ ├── infra/ # Infraestrutura
│ │ ├── hooks/ # Hooks customizados
│ │ ├── http/ # Configuração de HTTP
│ │ │ ├── api/ # Endpoints da API
│ │ │ └── axios.ts # Configuração do Axios
│ │ ├── providers/ # Provedores de contexto
│ │ └── repositories/ # Repositórios
│ │
│ ├── lib/ # Utilitários
│ │ ├── format.ts # Funções de formatação
│ │ ├── http.ts # Utilitários HTTP
│ │ └── utils.ts # Funções auxiliares
│ │
│ ├── providers/ # Provedores globais
│ │ ├── query-provider.tsx # Provedor do React Query
│ │ └── theme-provider.tsx # Provedor de tema
│ │
│ └── services/ # Serviços da aplicação
│     ├── auth.ts # Serviço de autenticação
│     └── services.ts # Serviço de gestão de serviços
│
├── public/ # Arquivos estáticos
└── tailwind.config.ts # Configuração do Tailwind
```
