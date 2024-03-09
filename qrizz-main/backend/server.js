import cors from "cors";
import express from "express";

const app = express();
const port = 3001;

app.use(cors());

// Define your API endpoint to handle GET requests to /api/values
app.get('/api/values', (req, res) => {
    // Replace this with logic to fetch your list of values from the database or any other source
    const database = [
        { title: 247, sales: 2.3, albums: 10 },
        { title: 207, sales: 2.3, albums: 20 },
    ];
    res.json(database); // Sending the array of objects as JSON response
});
app.get('/api/graph1', (req, res) => {
    // Replace this with logic to fetch your list of values from the database or any other source
    const databaserevenue =[
        { "date": "01 Jan", "revenue": 1000 },
        { "date": "05 Jan", "revenue": 1800 },
        { "date": "08 Jan", "revenue": 1300 },
        { "date": "09 Jan", "revenue": 1100 },
        { "date": "10 Jan", "revenue": 1900 }
      ];
    res.json(databaserevenue); // Sending the array of objects as JSON response
});

app.get('/api/graph2', (req, res) => {
    // Replace this with logic to fetch your list of values from the database or any other source
    const data2 = [
        {
          x: 1,
          groupA: 38,
          groupB: 19,
          
        },
        {
          x: 2,
          groupA: 16,
          groupB: 14,
         
        },
        {
          x: 3,
          groupA: 64,
          groupB: 96,
         
        },
        {
          x: 4,
          groupA: 32,
          groupB: 48,
        
        },
        {
          x: 5,
          groupA: 12,
          groupB: 18,
         
        },
      ];
    res.json(data2); // Sending the array of objects as JSON response
});
app.get('/api/sales', (req, res) => {
    // Replace this with logic to fetch your list of values from the database or any other source
    const topsalesdata = [
        '69,700','2.2%',
        '7,660',   
        '2,820',
        '45,257',
        '2,420','2.6%'
    ];
    res.json(topsalesdata); // Sending the array of objects as JSON response
});
// Start the server
app.listen(port, () => {
    console.log("App running");
    console.log(`Server listening at http://localhost:${port}`);
});
