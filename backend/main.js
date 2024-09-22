const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin-routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('api/v1/admin', adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);  
})