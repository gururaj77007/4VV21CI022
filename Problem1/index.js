
const express = require('express');
const app = express();
const port = 3077;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example route' });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
