# 🧑‍💼 RHMaster

A RESTful API for managing employee data, including positions, salaries and benefits. Built with **Node.js** and **PostgreSQL**, this system helps organizations handle human resource operations efficiently and securely.

---

## 🚀 Project Goals

To create an HR management system that allows companies to:
- Register and manage employee data
- Assign positions and benefits
- Calculate accrued benefits

---

## 🧱 Entities

- **Employee** – Stores personal and professional details
- **Position** – Represents job roles and salaries
- **Benefit** – Perks offered by the company (e.g., meal vouchers, health plans)

---

## 🔧 Features

- ✅ **CRUD for Employees**
- ✅ **Assign Positions and Benefits**
- ✅ **Calculate Benefit Balances**
- ✅ **JWT Authentication for Secure Access**
- ✅ **Many-to-Many Relationship** between Employees and Benefits
- ✅ **Media Support** (Image, Audio, Video)

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JSON Web Token (JWT)
- **Testing:** Vitest + Supertest
- **File Handling:** Multer (for media upload)

---

## 📚 Example Use Cases

- HR managers can assign roles and benefits to new employees.
- Benefit accumulation help comply with labor regulations.
- Media support allows uploading employee profile photos or scanned documents.

---

## 🛡️ Security

- All routes (except login/register) are protected using JWT authentication.
- Input validation and error handling are implemented to ensure API robustness.

---

## ⚠️ TODO

- [ ] Add Swagger/OpenAPI documentation
- [ ] Implement email notifications for vacation approvals

---

## 📬 Feedback & Contributions

Pull requests and issue reports are welcome. Help make this HR Management API even better!
