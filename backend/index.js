const path = require('path'); // Add this for serving React files

// Static file serving for React
app.use(express.static(path.join(__dirname, '../build')));

// Home Page (Protected)
app.get('/home', (req, res) => {
  if (req.session.userId) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  } else {
    res.redirect('/login');
  }
});

// Login Page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Signup Page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
