# MERN-E-Commerce-Microservices
A simple e-commerce application built using the **MERN Stack** with a **Microservices Architecture**. This project demonstrates how an online shopping platform can be decomposed into independent services that communicate through APIs, making the application scalable, maintainable, and easier to develop.

---

## Overview

This project is a learning implementation of microservices using the MERN stack. Each core business domain is separated into its own service, allowing independent development, deployment, and scaling.

The application includes basic e-commerce features such as:

- User authentication
- Product management
- Shopping cart
- Order processing
- API Gateway
- Service-to-service communication

---

##  Sytem Architecture
```
                        Client (React)
                              │
                              ▼
                        API Gateway
      ┌───────────────┬───────────────┬───────────────┐
      ▼               ▼               ▼               ▼
 Auth Service    Product Service   Cart Service   Order Service
      │               │               │               │
      ▼               ▼               ▼               ▼
 MongoDB         MongoDB         MongoDB         MongoDB
```
## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
