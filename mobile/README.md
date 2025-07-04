# 🛍️ Sistema de Contratação de Serviços

Este projeto é um **ecossistema simples e funcional** que simula um catálogo de serviços, onde usuários podem visualizar prestadores e realizar contratações por meio de um formulário. A solução foi pensada para ser multiplataforma, com foco principal em mobile via **React Native com Expo**.

## 🎯 Objetivo

Demonstrar uma arquitetura escalável, organizada e prática para aplicações com:

- 📱 Consumo de API (JSON Server)
- ✅ Validação de formulários (React Hook Form + Yup)
- 🧭 Navegação entre telas (React Navigation)
- 🎨 Estilização responsiva e moderna

Ideal para **estudos, testes técnicos ou como base para projetos reais maiores**.

## ✅ Funcionalidades Implementadas

### 🔐 **Autenticação**

- Login mocado (aceita qualquer email/senha)
- Sem Firebase - autenticação simplificada para demonstração

### 🛍️ **Gestão de Serviços**

- **Listagem** de serviços disponíveis
- **Cadastro** de novos serviços via formulário
- **Contratação** de serviços com formulário completo

### 📝 **Formulários Avançados**

- **Validação** com React Hook Form + Yup
- Campos obrigatórios: Nome, Email, Telefone
- **Impressão no console** dos dados + nome do serviço

## 🚀 **Como usar**

### 1️⃣ Configuração Inicial

```bash
# Clonar o repositório
git clone [URL_DO_REPOSITÓRIO]
cd mobile

# Instalar dependências
npm install
```

### 2️⃣ Configuração do IP

1. Abra o terminal e digite `ipconfig` (Windows) ou `ifconfig` (Linux/Mac)
2. Copie seu endereço IPv4 (exemplo: 192.168.1.100)
3. No arquivo `src/infra/repositories/adapters/jsonServer/index.ts`, atualize o IP:

```typescript
const baseURL = 'http://SEU_IP:3001'
```

### 3️⃣ Backend (JSON Server)

```bash
# Rodar o JSON Server com seu IP
npm run json-server -- --host SEU_IP
```

O backend estará disponível em: `http://SEU_IP:3001`

Endpoints disponíveis:

**Serviços:**

- `GET    http://SEU_IP:3001/services` - Listar todos os serviços
- `GET    http://SEU_IP:3001/services/:id` - Buscar serviço por ID
- `POST   http://SEU_IP:3001/services` - Criar novo serviço
- `GET    http://SEU_IP:3001/users` - Listar todos os usuários

> 💡 **Importante**:
>
> - Mantenha o servidor rodando em um terminal separado
> - Certifique-se de que seu celular e computador estão na mesma rede Wi-Fi
> - Caso use emulador Android, `10.0.2.2` é o IP para acessar o localhost

### 4️⃣ Frontend Mobile

```bash
# Em outro terminal, inicie o app
npm start

# Ou use um dos comandos específicos:
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

Após rodar `npm start`:

1. Pressione `a` para abrir no Android
2. Pressione `i` para abrir no iOS
3. Escaneie o QR Code com o app Expo Go no seu celular

> 🔧 **Solução de Problemas**:
>
> - Se tiver problemas de conexão, verifique se o celular está na mesma rede Wi-Fi
> - Para desenvolvimento local, prefira usar o emulador Android/iOS
> - Em caso de erros de módulo, tente `npm install` novamente

## 📱 **Telas**

1. **🔐 Login** - Autenticação simples
2. **🏠 Home** - Listagem de serviços
3. **➕ Cadastrar** - Novo serviço
4. **📋 Contratar** - Formulário de contratação
5. **👤 Perfil** - Informações do usuário

```

## 📁 Estrutura do Projeto

### 📱 Mobile (React Native + Expo)

```

mobile/
├── app/ # App Router (Expo Router)
│ ├── (protected)/ # Rotas protegidas (requer autenticação)
│ │ ├── (tabs)/ # Navegação por tabs
│ │ │ ├── index.tsx # Tela inicial (Home)
│ │ │ ├── add-service.tsx # Adicionar serviço
│ │ │ └── profile.tsx # Perfil do usuário
│ │ └── contract-service/# Contratação de serviço
│ │ └── [id].tsx # Tela dinâmica de contratação
│ ├── sign-in.tsx # Tela de login
│ └── \_layout.tsx # Layout principal
│
├── src/
│ ├── domain/ # Regras de negócio
│ │ ├── auth/ # Autenticação
│ │ └── service/ # Serviços
│ │
│ ├── infra/ # Infraestrutura
│ │ ├── feedbackService/# Serviço de feedback
│ │ ├── operations/ # Operações de API
│ │ └── repositories/ # Repositórios de dados
│ │
│ └── ui/ # Interface do usuário
│ ├── components/ # Componentes reutilizáveis
│ └── theme/ # Tema e estilos
│
└── assets/ # Recursos estáticos
├── fonts/ # Fontes personalizadas
├── icons/ # Ícones do app
└── images/ # Imagens

```

```
