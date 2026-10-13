<div align="center">

# POS System — Backend

**A full-featured point-of-sale system API built with NestJS, TypeORM, and PostgreSQL.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)

</div>

---

## Overview

POS System Backend is the API for a retail point-of-sale system. It manages staff and roles, the product catalog, inventory movements, customers, and sales transactions, and it documents every endpoint with Swagger.

## Features

- **Staff authentication:** login, registration, forgot-password and reset-password emails, and JWT guards.
- **Role-based access** with current-staff decorators and interceptors.
- **Staff management:** create, update, filter, sort, count, and change roles.
- **Products and categories:** CRUD, search, sorting, pagination, counts, and low-stock alerts.
- **Inventory:** stock-in and stock-out operations.
- **Customers and transactions** as data models for sales.
- **File uploads** for images, served as static files.
- **Swagger API documentation** with paginated-response decorators.
- **Structured logging** with Pino.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | NestJS |
| Language | TypeScript |
| Database | PostgreSQL, TypeORM |
| Authentication | Passport JWT, bcrypt |
| Email | SMTP (Nodemailer) |
| Docs | Swagger (OpenAPI) |
| Logging | Pino |

## Getting Started

### Prerequisites

- Node.js and npm
- A PostgreSQL database

### Installation

```bash
git clone https://github.com/RithyBondeth/Pos-System-Backend.git
cd Pos-System-Backend
npm install
npm run start:dev
```

- API: `http://localhost:3000/api`
- Swagger docs: `http://localhost:3000/docs`

### Environment Variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL`, `DATABASE_PORT` | PostgreSQL connection |
| `SYNCHRONIZE` | Auto-sync the schema (development only) |
| `JWT_SECRET`, `JWT_EXPIRES` | Token signing |
| `SMTP_HOST`, `SMTP_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM` | Password-reset email |
| `PORT` | Server port (default `3000`) |

## Project Structure

```text
Pos-System-Backend/
├── src/
│   ├── auth/        # Login, register, forgot and reset password, guards
│   ├── staff/       # Staff management
│   ├── product/     # Products, plus category/ submodule
│   └── inventory/   # Stock in and stock out
└── libs/common/src/
    ├── database/    # Entities: staff, role, customer, product, category,
    │                # inventory, transaction
    ├── email/       # Email module
    ├── jwt/         # JWT module
    ├── swagger/     # Swagger setup and decorators
    ├── uploadfile/  # File upload interceptor and service
    └── logger/      # Pino logger
```

## Related Repositories

- [Pos-System-Frontend](https://github.com/RithyBondeth/Pos-System-Frontend): the Vue.js interface

## Author

**Rithy Bondeth** — Full Stack Developer & AI Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://bondeth.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RithyBondeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rithy-bondeth-484073282/)

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
