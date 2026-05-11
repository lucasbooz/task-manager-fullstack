# 📝 Task Manager - Fullstack (Rails + Vue)

Aplicação fullstack de gerenciamento de tarefas desenvolvida como teste técnico, utilizando **Ruby on Rails (API)** no backend e **Vue.js** no frontend.

---

## 🚀 Funcionalidades

- ✅ Criar tarefas
- 📋 Listar tarefas
- ✏️ Marcar como concluída
- ❌ Excluir tarefas
- 📅 Definir prazo (deadline)
- ⚠️ Identificação automática de tarefas atrasadas
- 🔎 Filtro por status:
  - Todas
  - Pendentes
  - Concluídas
  - Atrasadas

---

## 🧠 Regras de Negócio

- O status das tarefas **não é armazenado no banco**
- Ele é **calculado dinamicamente** com base em:
  - prazo (`deadline`)
  - status de conclusão (`completed`)

- Isso evita inconsistência de dados e simplifica a lógica

---

## 🏗️ Arquitetura

- Backend: API REST com Ruby on Rails
- Frontend: Vue.js (Vite)
- Comunicação: HTTP (Axios)
- Banco de dados: SQLite

Estrutura:

```
frontend/   -> aplicação Vue
backend/    -> API Rails
```

---

## ⚙️ Como executar o projeto

### 🔧 Backend (Rails API)

```bash
cd backend
bundle install
rails db:create
rails db:migrate
rails s
```

Servidor disponível em:

```
http://localhost:3000
```

---

### 💻 Frontend (Vue)

```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador:

```
http://localhost:5173
```

---

## 📡 Integração

O frontend consome a API do backend através de requisições HTTP utilizando Axios.

Exemplo de endpoint:

```
GET http://localhost:3000/tasks.json
```

---

## 🎯 Decisões Técnicas

- Separação clara entre frontend e backend
- Uso de Rails em modo API (`--api`)
- Camada de service no frontend para chamadas HTTP
- Status derivado (não persistido)
- Manipulação de datas evitando problemas de timezone

---

## 📌 Observações

- O projeto foi desenvolvido com foco em simplicidade, organização e clareza de código
- Interface simples, porém funcional e responsiva
- Estrutura preparada para evolução futura (componentização, autenticação, etc.)

---

## 👨‍💻 Autor

Desenvolvido como teste técnico.
