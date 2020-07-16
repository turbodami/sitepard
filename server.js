const express = require("express");
const connectDB = require("./config/db");
const path = require('path');
const app = express();

require('dotenv').config();

//connect db
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/siteSpaces", require("./routes/api/siteSpacesRoute"));
app.use("/api/site", require("./routes/api/siteDatabaseRoute"));
app.use("/api/payment", require("./routes/api/paymentsRoute"));
app.use("/api/webhook", require("./routes/api/webhookRoute"));
app.use("/api/mail", require("./routes/api/mailRoute"));

// Serve staitc assets in production
if(process.env.NODE_ENV === 'production')
{
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>
    {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server ${PORT}`));
