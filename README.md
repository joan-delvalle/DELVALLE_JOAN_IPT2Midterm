# Lost and Found Registry

## Purpose

Lost and Found Registry is a full-stack web application for recording and managing items found on campus or in a school/community area. Users can add found items, view registered items, update item information, and delete records when they are no longer needed.

## Features

* Add a found item
* View all found items
* Update an existing item
* Delete an item
* Set an item as Claimed or Unclaimed
* Form validation
* Loading and empty-list messages
* Error and success messages
* Data stored permanently in MongoDB

## Technologies

* React
* Vite
* Node.js
* Express
* MongoDB
* Mongoose
* JavaScript
* Git
* GitHub

## Main Record

Each Lost and Found Item contains:

* Description
* Place Found
* Date Found
* Claimed Status
* Finder

## Why MongoDB?

MongoDB is suitable for this application because it stores records as flexible documents. Each found item can be stored as one document containing the item's description, location, date, status, and finder. Mongoose provides schema validation to make sure the required fields have the correct format. The application mainly performs simple create, read, update, and delete operations, which makes MongoDB a suitable choice.

## Project Structure

```text
DELVALLE_JOAN_IPT2Midterm/
├── backend/
│   ├── models/
│   │   └── LostFoundItem.js
│   ├── routes/
│   │   └── itemRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemForm.jsx
│   │   │   └── ItemList.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/joan-delvalle/DELVALLE_JOAN_IPT2Midterm.git
cd DELVALLE_JOAN_IPT2Midterm
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The React application runs at the Vite address shown in the terminal, normally:

```text
http://localhost:5173
```

## API Routes

| Method | Route            | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/items`     | Get all found items |
| GET    | `/api/items/:id` | Get one found item  |
| POST   | `/api/items`     | Create a found item |
| PUT    | `/api/items/:id` | Update a found item |
| DELETE | `/api/items/:id` | Delete a found item |

## Example POST Request

```json
{
  "description": "Black wallet",
  "placeFound": "Library",
  "dateFound": "2026-10-01",
  "claimedStatus": "Unclaimed",
  "finder": "Joan Del Valle"
}
```

## Application Flow

```text
React Frontend
      |
      v
Express REST API
      |
      v
Mongoose
      |
      v
MongoDB
```

The React frontend does not connect directly to MongoDB. All database operations are handled by the Express backend.

## GitHub

Repository:

https://github.com/joan-delvalle/DELVALLE_JOAN_IPT2Midterm
