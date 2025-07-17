# Order Milk Tea Application

A full-stack web application for ordering milk tea, built with Angular (frontend) and Node.js (backend).

## 🎯 Project Overview

This application allows users to browse milk tea categories, view products, and place orders. The system features a responsive design with category-based navigation and a seamless ordering experience.

## 🛠 Tech Stack

### Frontend
- **Framework**: Angular 17.3.0
- **Language**: TypeScript
- **Styling**: SCSS
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Build Tool**: Angular CLI

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (assumed)
- **Language**: JavaScript

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for production)

## 📁 Project Structure

```
order-milk-tea/
├── README.md
├── docker-compose.yml
├── .gitattributes
│
├── client/                     # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── sidebar/        # Sidebar component with categories
│   │   │   ├── category-menu/  # Category menu service
│   │   │   └── ...
│   │   ├── assets/
│   │   ├── environments/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── angular.json
│
└── server/                     # Node.js Backend
    ├── index.js
    ├── mockMenuData.json       # Sample data
    ├── package.json
    └── Dockerfile
```

## ✅ Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Angular CLI** (v17.3.17)
- **Docker** (optional, for containerized deployment)
- **Docker Compose** (optional, for multi-container deployment)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd order-milk-tea
```

### 2. Install Dependencies

#### Frontend (Client)
```bash
cd client
npm install
```

#### Backend (Server)
```bash
cd server
npm install
```

## 💻 Development

### Running in Development Mode

#### Start Backend Server
```bash
cd server
npm start
# Server runs on http://localhost:3000
```

#### Start Frontend Development Server
```bash
cd client
npm start
# or
ng serve
# Frontend runs on http://localhost:4200
```



## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Categories
- `GET /api/categories/:id` - Get specific category details

#### Menu Items
- `GET /api/menu/:categoryId` - Get menu items by category


### Accessing the Application

After running with Docker Compose:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build
```

### Stopping Services

```bash
docker-compose down
```

