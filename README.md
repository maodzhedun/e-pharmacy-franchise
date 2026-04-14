# 💊 E-Pharmacy (Franchise)

Franchise management platform for online pharmacies.  
Allows pharmacy owners to register, create their shop, manage products, view statistics, and add medicines from a shared franchise catalog.

> **Related project:** [E-Pharmacy Admin Dashboard](https://github.com/maodzhedun) — shares the same backend.

## 🖥 Demo

- **Frontend:** [Vercel](https://e-pharmacy-franchise.vercel.app) *(deploy pending)*
- **Backend:** [Render](https://e-pharmacy-backend-llqq.onrender.com)

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.3 | React framework (App Router) |
| React | 19.1 | UI library |
| TypeScript | 5.8 | Type safety |
| Tailwind CSS | 4.1 | Utility-first styling |
| Zustand | 5.0 | Global state management |
| react-hook-form | 7.55 | Form handling + validation |
| react-hot-toast | 2.5 | Toast notifications |
| clsx | 2.1 | Conditional CSS classes |

### Backend (shared with Admin Dashboard)
| Technology | Purpose |
|-----------|---------|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JWT + httpOnly cookies | Authentication |
| Cloudinary | Image uploads (logo, product photos) |
| Celebrate (Joi) | Request validation |
| bcrypt | Password hashing |


## 📄 Pages

### Public (unauthorized)
| Route | Page | Description |
|-------|------|-------------|
| `/register` | RegisterPage | 4-field form (name, email, phone, password) |
| `/login` | LoginPage | 2-field form (email, password) |

### Private (authorized)
| Route | Page | Description |
|-------|------|-------------|
| `/create-shop` | CreateShopPage | Create pharmacy (7 fields + logo upload + delivery radio) |
| `/edit-shop` | EditShopPage | Edit pharmacy data (prefilled form) |
| `/shop` | ShopPage | Main page with 2 tabs: **Drug store** (own products) + **All medicine** (franchise catalog with filters) |
| `/medicine/[id]` | MedicinePage | Product details with **Description** + **Reviews** tabs, pagination |
| `/statistics` | StatisticsPage | KPI cards + Recent Customers table + Income/Expenses list |


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (for local backend) or use deployed Render backend

### Backend (if running locally)
```bash
git clone https://github.com/maodzhedun/e-pharmacy-backend.git
cd e-pharmacy-backend
npm install
cp .env.example .env
# Fill in: MONGODB_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
npm run seed   # Creates test users + sample data
npm run dev    # Starts on port 3000 (or PORT from .env)
```

### Frontend
```bash
git clone https://github.com/maodzhedun/e-pharmacy-franchise.git
cd e-pharmacy-franchise
npm install
cp .env.example .env.local
# Set: BACKEND_URL=http://localhost:3001  (local) or https://e-pharmacy-backend-llqq.onrender.com (deployed)
npm run dev    # Starts on http://localhost:3000
```

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin (Dashboard) | admin@gmail.com | admin123 |
| Vendor (Franchise) | vendor@gmail.com | admin123 |

## 🔗 API Endpoints (Backend)

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user/register` | Register new vendor |
| POST | `/api/user/login` | Login |
| GET | `/api/user/logout` | Logout |
| GET | `/api/user/user-info` | Current user info |

### Shop
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/shop/create` | Create pharmacy |
| GET | `/api/shop` | Get my shop |
| PUT | `/api/shop/update` | Update shop data |

### Products
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/shop/products` | Shop's own products (Drug store tab) |
| GET | `/api/shop/all-medicine` | All franchise products (with filters) |
| POST | `/api/shop/products/add` | Add new product |
| PUT | `/api/shop/products/:id/edit` | Edit product |
| DELETE | `/api/shop/products/:id/delete` | Delete product |
| POST | `/api/shop/products/:id/add-to-shop` | Add existing product to own shop |
| GET | `/api/shop/products/:id` | Product detail + reviews |

### Statistics
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/statistics` | KPI + customers + income/expenses |
| GET | `/api/statistics/:clientId/goods` | Client's purchased goods |

## 👤 Author

**Vladyslav** — [GitHub](https://github.com/maodzhedun)

GoIT Fullstack Development Program
