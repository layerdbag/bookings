# Booking Service
* A simple booking RESTful Service* 

---

## About the project
The project allows an employee of a fictitious organization to book desk and room space for work.

### **Built With**
- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [Sequelize ORM](https://sequelize.org)

---

## Features
- A user can register and sign in
- A bearer token is created for a signed in user
- A signed in user can book a desk or workspace once per day
- Booking is allowed between 09:00 to 17:00


---

## Getting Started
- **Node.js** (version >=22.0.0)
- **pnpm** (or **npm**)

### Installation

1. Clone the repo:
```bash
git clone https://github.com/layerdbag/bookings.git
```
2. Navigate to the project directory:
```bash
cd bookings
```
3. Install dependencies:
```bash
pnpm install
```
4. Run the application:
```bash
pnpm run dev
```

---

## Usage
Use application like Postman Client or Download Postman extension or Rest Client extension from VScode

```Rest Client

post http://localhost:3001/api/register
Content-Type: application/json

{
  "name": "your_name",
  "username": "your_username",
  "email: "your_email",
  "password: "secret",
}
```
After that you can get a bearer token which can be used to `login` and to `book` a desk and room in the fictitious Office.

## License
Distributed under the **MIT License**. See `LICENSE` for more information.



