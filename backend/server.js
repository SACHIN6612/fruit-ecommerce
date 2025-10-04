const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'fruit_ecommerce',
});

Connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL Database!');
})

// Insert product
app.post('/products', (req, res) => {
  const {
    title, description, price, sale_price,
    brand_id, category_id, stock, sku,
    discountPercentage, weight, thumbnail_image, category_name
  } = req.body;

  Connection.query(`INSERT INTO products (title, description, price, sale_price, brand_id, category_id, stock, sku, discountPercentage, weight, thumbnail_image, category_name) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [title, description, price, sale_price, brand_id, category_id, stock, sku, discountPercentage, weight, thumbnail_image, category_name], (error, results) => {
      if (error) {
        console.error('Error Inserting:', error);
        return res.status(200).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Data Inserted Successfully" });
    });
});

// Update product
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const {
    title, description, price, sale_price,
    brand_id, category_id, stock, sku,
    discountPercentage, weight, thumbnail_image, category_name
  } = req.body;

  Connection.query(`UPDATE products SET title=?, description=?, price=?, sale_price=? brand_id=?, category_id=?, stock=?, sku=?, discountPercentage=?, weight=?, thumbnail_image=?, category_name=? WHERE id=?`, [title, description, price, sale_price, brand_id, category_id, stock, sku, discountPercentage, weight, thumbnail_image, category_name, id], (error, results) => {
      if (error) {
        console.error('Error Updating:', error);
        return res.status(200).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Data Updated Successfully" });
    });
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  Connection.query(`DELETE FROM products WHERE id=?`, [id], (error, results) => {
    if (error) {
      console.error('Error Deleting:', error);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Data Deleted Successfully" });
  });
});

// Get single product by ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id;

  Connection.query('SELECT * FROM products WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error('Error Fetching Single Product:', error);
      return res.status(200).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(204).json({ message: "Product not found" });
    }
    res.json(results[0]);
  });
});

// Get all products (no pagination, for sidebar etc.)
app.get('/all-products', (req, res) => {
  Connection.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(200).json({ error: "DB error" });
    res.json(results);
  });
});

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1; // frontend sends page
  const skip = (page - 1) * limit; // calculate offset

  Connection.query('SELECT COUNT(*) AS total FROM products', (error, countResult) => {
    if (error) {
      console.error('Count query error:', error);
      return res.status(200).json({ error: 'Database error' });
    }
    const total = countResult[0].total;

    Connection.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, skip], (error2, results) => {
      if (error2) {
        console.error('Data query error:', error2);
        return res.status(200).json({ error: 'Database error' });
      }
      res.json({
        products: results,
        total: total,
        limit: limit,
        skip: skip,
      });
    });
  });
});

app.get("/categories-count", (req, res) => {
    Connection.query(`SELECT categories.category_name, COUNT(products.id) AS total FROM categories LEFT JOIN products ON categories.id = products.category_id GROUP BY categories.id, categories.category_name;`, (error, results) => {
        if (error) return res.status(200).json({ error: error });
        res.json(results);
    });
});

// Rate a product
app.post("/products/:id/rating", (req, res) => {
  const productId = req.params.id;
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  const sql = `
    UPDATE products 
    SET rating = ((rating * rating_count) + ?) / (rating_count + 1),
        rating_count = rating_count + 1
    WHERE id = ?
  `;

  Connection.query(sql, [rating, productId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Rating added successfully" });
  });
});


// Cookie example
app.get("/setcookie", (req, res) => {
  res.cookie("username", "student123").send("Cookie set!");
});
app.get("/getcookie", (req, res) => {
  res.send("Cookie value: " + req.cookies.username);
});
app.get("/clearcookie", (req, res) => {
  res.clearCookie("username").send("Cookie cleared!");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server running on Port ${PORT}');
});