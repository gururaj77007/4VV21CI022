
const express = require('express');
const app = express();
const port = 3077;
const WINDOW_SIZE = 10;
const numbersWindow = [];
const testServerUrl = 'http://20.244.56.144/test';
const axios = require('axios');



app.use(express.json());


app.get('/', (req, res) => {
  const config = {
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwMjQyMDI1LCJpYXQiOjE3MjAyNDE3MjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdiN2RkMzg0LTdmNTYtNGNiNi04NjNjLWQ3ODU4MjY5ZWQ2YyIsInN1YiI6Imd1cnVyYWouZC43Ny4wMDdAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiRHJvcHMiLCJjbGllbnRJRCI6IjdiN2RkMzg0LTdmNTYtNGNiNi04NjNjLWQ3ODU4MjY5ZWQ2YyIsImNsaWVudFNlY3JldCI6ImlzWldkbVRQY1dwTnhsb08iLCJvd25lck5hbWUiOiJHdXJ1IFJhaiBEIiwib3duZXJFbWFpbCI6Imd1cnVyYWouZC43Ny4wMDdAZ21haWwuY29tIiwicm9sbE5vIjoiNFZWMjFDSTAyMiJ9.qT3QBdKoSmEWmSTpr6EjNehUZ4WcqmoiusAYQqHEGwM'
    }
  };
  
  axios.get('http://20.244.56.144/test/primes', config)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  res.send('Hello, World!');
});
app.get('/number/:numberID', async (req, res) => {
  

  const config = {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwMjQ1MTEzLCJpYXQiOjE3MjAyNDQ4MTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdiN2RkMzg0LTdmNTYtNGNiNi04NjNjLWQ3ODU4MjY5ZWQ2YyIsInN1YiI6Imd1cnVyYWouZC43Ny4wMDdAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiRHJvcHMiLCJjbGllbnRJRCI6IjdiN2RkMzg0LTdmNTYtNGNiNi04NjNjLWQ3ODU4MjY5ZWQ2YyIsImNsaWVudFNlY3JldCI6ImlzWldkbVRQY1dwTnhsb08iLCJvd25lck5hbWUiOiJHdXJ1IFJhaiBEIiwib3duZXJFbWFpbCI6Imd1cnVyYWouZC43Ny4wMDdAZ21haWwuY29tIiwicm9sbE5vIjoiNFZWMjFDSTAyMiJ9.2qaPDjetVvGpxIFBVUnGJTopkARJYXmkIMlj5LjxKaI'
    }
};
  try {
    const numberID = req.params.numberID.toUpperCase();
    const endpointMap = {
      'P': '/primes',
      'F': '/fibo', 
      'E': '/even',
      'R': '/rand' 
    };
  const endpoint = endpointMap[numberID[0]];
  console.log(endpoint)
   const response = await axios.get(`${testServerUrl}${endpoint}`, config, { timeout: 500 });
    console.log(response)
      const fetchedNumbers = response.data.numbers; 
      const uniqueNumbers = [...new Set([...numbersWindow, ...fetchedNumbers])];
      const previousState = [...numbersWindow];
      numbersWindow.splice(0, numbersWindow.length, ...uniqueNumbers.slice(-WINDOW_SIZE));
      const sum = numbersWindow.reduce((acc, num) => acc + num, 0);
      const average = numbersWindow.length ? sum / numbersWindow.length : 0;

      res.json({
          numbers: numbersWindow,
          windowPrevState: previousState,
          windowCurrState: numbersWindow,
          average: average
      });

  } catch (error) {
   
      console.error('Error fetching numbers:', error);
      res.status(500).json({ error: 'Failed to fetch numbers from test server' });
  }
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
