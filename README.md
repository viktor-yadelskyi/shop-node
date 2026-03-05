# Shop Node

A server-side e-commerce application built with Node.js following the MVC architectural pattern.

## About

This project is a backend web application for managing products in an online shop. It demonstrates core Node.js concepts including routing, MVC architecture, and server-side templating.

## Features

- View all products
- Add new products
- Edit existing products
- Delete products
- MVC architecture (Models, Views, Controllers)
- Server-side rendering with EJS templates

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Template Engine:** EJS
- **Architecture:** MVC
- **Data Storage:** File-based storage

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/viktor-yadelskyi/shop-node.git
cd shop-node
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shop-node/
├── controllers/    # Request handlers and business logic
├── models/         # Data models
├── routes/         # Express route definitions
├── views/          # EJS templates
├── data/           # File-based data storage
└── app.js          # Application entry point
```

## In Progress

- Database integration (MySQL / MongoDB)
- User authentication
- Shopping cart functionality
- Order management