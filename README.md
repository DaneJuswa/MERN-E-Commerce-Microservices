# MERN-E-Commerce-Microservices
A simple e-commerce application built using the **MERN Stack** with a **Microservices Architecture**. This project demonstrates how an online shopping platform can be decomposed into independent services that communicate through APIs, making the application scalable, maintainable, and easier to develop.

---

## Overview

This project is a learning implementation of microservices using the MERN stack. Each core business domain is separated into its own service, allowing independent development, deployment, and scaling.

The application includes features such as:

- 🔐 JWT Authentication
- 🔑 OAuth Login (Google & Facebook)
- 📦 Product Catalog
- 🛍️ Shopping Cart
- 📋 Order Management
- 💳 Checkout Flow
- 📈 API Gateway
- 📨 Event-Driven Communication
- ⚡ Apache Kafka Messaging
- 🔄 Service-to-Service Communication
- 🐳 Dockerized Services
- 🌐 REST APIs
- ⚡ Independent Service Deployment

---

##  Sytem Architecture
```
                     React + TypeScript
                            │
                            ▼
                    API Gateway (Express)
                            │
      ┌────────────────┬────────────────┬────────────────┬
      ▼                ▼                ▼                ▼
 Auth Service    Product Service   Cart Service    Order Service
      │                │                │                │
      │                │                │                │
      ▼                ▼                ▼                ▼
    MongoDB         MongoDB          MongoDB          MongoDB
      │                │                │                │
      └────────────────┴────────────────┴────────────────┘
                               │
                               ▼
                        Apache Kafka
                    (Event Streaming Platform)
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
 Notification Service   Inventory Service   Analytics Service
```
## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![OAuth 2.0](https://img.shields.io/badge/OAuth_2.0-4285F4?style=for-the-badge)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Messaging

![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)

### DevOps & Infrastructure

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### Tools

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
