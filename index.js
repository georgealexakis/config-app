const fs = require('fs');
const express = require('express');
const cors = require('cors');
const corsOptions = { origin: '*' };
const app = express();

// CORS policy
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route for base URL to retrieve JSON
app.get('/', (_req, res) => {
    // JSON read
    let rawdata = fs.readFileSync('config.json');
    res.json(JSON.parse(rawdata));
});

// POST data to configuration file
app.post('/', (req, res) => {
    // JSON read
    let data = JSON.stringify(req.body, null, 2);
    // Write config.json
    fs.writeFile('config.json', data, (error) => {
        if (error) {
            res.status(500).send({
                message: 'Error updating config file'
            });
        }
    });
    // Send feedback
    res.send('Config file updated successfully');
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Start listener
app.listen(8081);