# Full-Stack E-Commerce Application

This is a Full-Stack E-Commerce Application featuring an MVC Back End using Node.js + Express, and a Next.js Front End. 
It integrates both PostgreSQL (for relational data like Users and Orders) and MongoDB (for document data like Products).

## Architecture

- **Backend (`/backend`)**: Node.js + Express in MVC pattern (Models, Views/JSON, Controllers, Routes).
- **Frontend (`/frontend`)**: Next.js App Router setup with Vanilla CSS, Server-Side Rendering (SSR) capabilities, and TypeScript.
- **Databases**:
  - PostgreSQL: `users`, `orders`, `order_items`
  - MongoDB: `products`

## Installation Steps

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally (or remote URI)
- MongoDB installed and running locally (or remote URI)

1. **Clone the repository** (if you haven't already).
2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

## Database Setup Instructions

### Environment Variables
Inside the `backend` folder, create a `.env` file (you can copy from `.env.example` if available) and provide your database credentials:
```env
PORT=5000

# PostgreSQL
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=ecommerce
PG_PASSWORD=your_password
PG_PORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/ecommerce
```

### SQL Schema Initialization
You will need to run the following script (in PostgreSQL/pgAdmin) to set up your tables initially (a migration script can also be added in the future):

```sql
CREATE DATABASE ecommerce;

\c ecommerce;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
```

### MongoDB Connection
MongoDB will automatically create the `ecommerce` database and the `products` collection upon first insertion when the server runs.

## Running the Application

### 1. Run the Back End (Node/Express)
Open a new terminal window:
```bash
cd backend
npm run dev
```
This will start the API server on [http://localhost:5000](http://localhost:5000).

### 2. Run the Front End (Next.js)
Open another terminal window:
```bash
cd frontend
npm run dev
```
This will start the frontend on [http://localhost:3000](http://localhost:3000).

## Folder Explanations

### `/backend/src`
- `app.ts` & `server.ts`: Initial server entry points handling express config and DB connection routines.
- `/config`: Configuration for PostgreSQL (`db.sql.ts`) and MongoDB (`db.mongo.ts`).
- `/controllers`: Application logic to handle endpoints (e.g. `AuthController`, `ProductController`).
- `/models`: Database schemas/wrappers.
  - `/mongo`: MongoDB schemas via Mongoose (`Product.ts`).
  - `/sql`: PostgreSQL wrappers or classes (`User.ts`, `Order.ts`, `OrderItem.ts`).
- `/routes`: Express routers mapping URLs to their corresponding Controller functions.

### `/frontend/src`
- `/app`: The new App Router directory. Includes standard UI pages layout files (`layout.tsx`, `page.tsx`). Includes initial styling (Vanilla CSS approach without Tailwind, as dictated by design constraints).

## API Checklist (To Be Built Further)
- `POST /api/auth/register`
- `GET /api/products` (MongoDB Text Search / Range enabled)
- `POST /api/orders/checkout` (PostgreSQL insertion)
- `GET /api/reports/sql` (Advanced PostgreSQL Query)
- `GET /api/reports/mongo` (MongoDB Aggregations)
