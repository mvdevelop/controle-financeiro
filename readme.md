# 💰 Controle Financeiro Familiar

Sistema web para controle financeiro familiar, desenvolvido como projeto de extensão universitária.

## 🚀 Stack

### Frontend
- **React 19** + **TypeScript 6**
- **Vite 8** (build tool)
- **Tailwind CSS 4** (estilização)
- **Redux Toolkit** (estado global)
- **Recharts** (gráficos)
- **React Router v7** (rotas)
- **Axios** (requisições HTTP)
- **React Toastify** (notificações)

### Backend
- **Java 17** + **Spring Boot 3.2.4**
- **Spring Data JPA** + **Hibernate**
- **PostgreSQL** (banco de dados)
- **Flyway** (migrations)
- **Spring Validation** (validação de dados)
- **Spring Actuator** (monitoramento)

### Deploy
- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)
- **Banco**: PostgreSQL (Render ou externo)

## 📋 Funcionalidades

- ✅ Cadastro de despesas por família e categoria
- ✅ Resumo financeiro com gráficos (pizza e barras)
- ✅ Relatórios por período
- ✅ Exportação de relatórios em CSV
- ✅ Filtros por família, categoria e período
- ✅ Tema claro/escuro
- ✅ Menu de acessibilidade (alto contraste, fonte grande)
- ✅ Interface responsiva

## 🛠️ Como rodar localmente

### Pré-requisitos
- Java 17+
- Node.js 22+
- Docker (para PostgreSQL)

### 1. Banco de dados (PostgreSQL)

```bash
docker run -d \
  --name postgres-financeiro \
  -e POSTGRES_DB=financeiro_familiar \
  -e POSTGRES_USER=financeiro \
  -e POSTGRES_PASSWORD=financeiro123 \
  -p 5432:5432 \
  postgres:16-alpine
```

### 2. Backend (Spring Boot)

```bash
cd backend
chmod +x mvnw
./mvnw spring-boot:run
```

O servidor iniciará em `http://localhost:8080`.

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

O servidor iniciará em `http://localhost:5173`.

### 4. Acessar

- **Frontend**: http://localhost:5173
- **API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/api/health
- **Despesas**: http://localhost:8080/api/despesas

## 📡 API Endpoints

### Despesas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/despesas` | Listar todas as despesas |
| `GET` | `/api/despesas/{id}` | Buscar despesa por ID |
| `GET` | `/api/despesas/familia/{familia}` | Buscar por família |
| `GET` | `/api/despesas/categoria/{categoria}` | Buscar por categoria |
| `GET` | `/api/despesas/periodo?inicio=&fim=` | Buscar por período |
| `GET` | `/api/despesas/resumo/familias` | Total por família |
| `GET` | `/api/despesas/resumo/categorias` | Total por categoria |
| `GET` | `/api/despesas/resumo/completo` | Resumo completo |
| `GET` | `/api/despesas/total/geral` | Total geral |
| `POST` | `/api/despesas` | Criar despesa |
| `PUT` | `/api/despesas/{id}` | Atualizar despesa |
| `DELETE` | `/api/despesas/{id}` | Deletar despesa |

### Relatórios

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/relatorios/periodo` | Relatório por período |
| `GET` | `/api/relatorios/familia/{familia}` | Relatório por família |
| `GET` | `/api/relatorios/export/csv` | Exportar CSV |

## 🌍 Deploy

### Frontend (Vercel)

Conecte o repositório na Vercel e faça deploy da pasta `frontend/`.

### Backend (Render)

1. Crie um Web Service no Render
2. Configure o build como Maven (`./mvnw clean package -DskipTests`)
3. Defina as variáveis de ambiente:
   - `SPRING_DATASOURCE_URL` — URL do PostgreSQL no Render
   - `SPRING_DATASOURCE_USERNAME` — usuário do banco
   - `SPRING_DATASOURCE_PASSWORD` — senha do banco
4. Start command: `./mvnw spring-boot:run`

## 📁 Estrutura do Projeto

```
cff-cs-degree/
├── backend/
│   ├── src/main/java/com/financeiro/
│   │   ├── config/          # Configurações (CORS)
│   │   ├── controller/      # Endpoints REST
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── exception/       # Tratamento de erros
│   │   ├── model/           # Entidades JPA
│   │   ├── repository/      # Repositórios
│   │   └── service/         # Regras de negócio
│   ├── src/main/resources/
│   │   ├── db/migration/    # Migrations Flyway
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Serviços HTTP
│   │   ├── store/           # Redux Toolkit
│   │   └── types/           # Tipos TypeScript
│   └── package.json
└── readme.md
```
