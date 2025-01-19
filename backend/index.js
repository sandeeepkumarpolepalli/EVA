// index.js

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const bcrypt = require('bcryptjs');
// const User = require('./models/user');

// const app = express();

// // MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/loginSystem', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// // Session Setup
// app.use(
//   session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: 'mongodb://127.0.0.1:27017/loginSystem',
//     }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
//   })
// );

// // Routes

// // Home Page (Protected)
// app.get('/home', (req, res) => {
//   if (req.session.userId) {
//     res.render('home', { message: 'Hello, World!' });
//   } else {
//     res.redirect('/login');
//   }
// });

// // Login Page
// app.get('/login', (req, res) => {
//   res.render('login');
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       req.session.userId = user._id;
//       res.redirect('/home');
//     } else {
//       res.send('Invalid email or password.');
//     }
//   } catch (error) {
//     res.send('An error occurred during login.');
//   }
// });

// // Signup Page
// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();
//     res.redirect('/login');
//   } catch (error) {
//     res.send('Error during signup. Please try again.');
//   }
// });

// // Logout
// app.get('/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/login');
//   });
// });

// // Start Server
// const PORT = 8000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT})`);