## ✅ Final `README.md` for FleetLink 🚛

````markdown
# 🚛 FleetLink - Logistics Vehicle Booking System

FleetLink is a full-stack logistics vehicle booking platform designed for B2B use-cases.
It allows administrators to manage a fleet of vehicles, check availability based on specific criteria,
and book vehicles seamlessly.

> ✅ Built with Node.js,Express ,React, and MongoDB Atlas

---

## 📌 Features

### 🔙 Backend (Node.js + Express)
- Add a new logistics vehicle with capacity and tyre info
- Check available vehicles by:
  - Capacity Required
  - Route (pincodes)
  - Desired Start Time
- Calculate estimated ride duration using custom logic
- Book vehicles if available
- Overlap check to prevent double bookings

### 💻 Frontend (React)
- Add Vehicle Page (form + success/error handling)
- Search & Book Page
  - Capacity, route & time input
  - Shows available vehicles with details
  - One-click **"Book Now"** button
- Simple, responsive, clean UI with attractive styling



---

## ⚙️ Tech Stack

| Part       | Technology       |
|------------|------------------|
| Frontend   | ReactJS          |
| Backend    | Node.js + Express|
| Database   | MongoDB Atlas ☁️ |
| Testing    |  jest            |

---

## 📦 Installation Guide

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-username/fleetlink-app.git
cd fleetlink-app
````

### ✅ 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### ✅ 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables (Important)

This project uses **MongoDB Atlas** for database, and the connection string is stored securely in an environment file:

### ⚠️ Why `.env` is NOT uploaded?

To keep sensitive credentials (like DB username/password) safe, we **never upload `.env` files to GitHub**.

Instead, we've created a `.env.example` file to give you a **reference of required keys**.

### 📁 `.env.example` (Backend)

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fleetlink?retryWrites=true&w=majority
```

Create your own `.env` file based on this template and **replace** with your actual MongoDB credentials.

---

## 🚀 Run the App Locally

### ▶️ Start Backend

```bash
cd backend
node server.js
```

Make sure MongoDB Atlas connection is active.

### ▶️ Start Frontend

```bash
cd ../frontend
npm start
```

Visit: `http://localhost:3000`

---

## 🧠 Ride Duration Logic (As per PDF)
estimatedRideDurationHours = Math.abs(toPincode - fromPincode) % 24

---

### 🧪 Testing (Jest + Supertest)
The backend is tested using Jest and Supertest to ensure core APIs are working as expected.

📁 Tested API:

=> POST /api/vehicles – create a vehicle with valid data

=> Error case – returns 400 if required fields are missing

🚀 How to Run Tests:

✅ 1. Install dev dependencies (already done if you ran npm install)
```
npm install --save-dev jest supertest
```

✅ 2. Run tests:
```
npm test
```

✅ Sample Output:
```
PASS  tests/vehicle.test.js
✓ should create a vehicle when valid data is sent
✓ should return 400 if required fields are missing
```
📘 Notes:

=> Test setup includes connection to MongoDB Atlas before tests run

=> Database is disconnected automatically after tests finish

=> Test cases use Supertest to simulate API requests programmatically (like Postman)

---

## 📁 Folder Structure (Simplified)

```
fleetlink-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
|   ├── tests/
│   ├── .env.example 
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.js
└── README.md ✅
```

---

## 👨‍💻 Author

> Made with ❤️ by kanhaiya lal sharma

---

## 📜 License

This project is for educational and assignment use only.

```

---

## ✅ Ready to Use

