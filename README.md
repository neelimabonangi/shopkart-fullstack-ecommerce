# 🛍️ ShopKart – Full Stack E-Commerce Application

ShopKart is a Flipkart-inspired full-stack e-commerce web application that allows users to browse products, filter by category, add items to cart, place orders, and view order history.  
The project is built with **React (Frontend)** and **Spring Boot (Backend)** and uses a structured product dataset.

---

## 🛠️ Tech Stack

### Frontend
- React JS
- React Router DOM
- Context API
- CSS (Flipkart-style UI)

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- PostgreSQL 

## 🚀 Features

### 🛒 Product & Shopping
- Browse **Men & Women** products
- Product listing with images, prices, and categories
- Product search functionality
- Category-based filtering (Men / Women / All)
- Zoom product image on click
- Size selection (S, M, L, XL, XXL)
- Free delivery & discount logic (UI-based)

### 🛍️ Cart
- Add product to cart (unique products only)
- Same product cannot be added multiple times
- Remove product from cart
- Cart total price calculation
- Cart badge count shows **unique items only**

### 💳 Checkout
- Buy Now (single product checkout)
- Cart checkout (multiple products)
- Quantity + / - buttons in checkout
- Address input
- Payment methods:
  - Cash on Delivery (COD)
  - UPI (PhonePe, Google Pay, Paytm)
- Order confirmation screen

### 🧾 Orders
- Order history page
- Displays:
  - Order date
  - Payment method
  - Total amount
  - Ordered products
- Large product images displayed clearly

### 🔐 Authentication (Frontend)
- Login page
- Signup page
- Navigation between login & signup

### 🧭 UI / UX
- Flipkart-style Navbar
- Hero banner with **Shop Now**
- Smooth scrolling to products
- Responsive grid layout
- Clean & modern UI

---

## 📊 Dataset Information

### Dataset Size
- **Rows (Products):** 27
- **Columns (Fields):** 5

### Dataset Columns
| Column Name | Description |
|------------|------------|
| `id` | Unique product ID |
| `category` | Men / Women |
| `name` | Product name |
| `price` | Product price |
| `imageUrl` | Product image URL |

> ⚠️ Ratings, discounts, sizes, and free delivery are handled in frontend logic and are **not stored in the dataset**.

---

## ▶️ How to Run the Project

### Frontend (React JS)
```bash
npm install
npm run dev

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run

---

## ⭐ Highlights
- Flipkart-like user experience
- Clean component architecture
- Global state management using Context API
- Unique cart logic (no duplicate products)
- Separate Buy Now and Cart flows









