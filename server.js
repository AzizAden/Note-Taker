const express = require('express');
const path = require('path');
const customRoutes = require('./customRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(customRoutes);

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'secret.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hidden.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
