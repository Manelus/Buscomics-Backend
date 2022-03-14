const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
const logger = require("./config/winston");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({origin: '*'}));

app.get('/', (req, res) => {res.send('Bienvenidos a Express');});

app.listen(PORT, () => {
     console.log(`App corriendo en el puerto: ${PORT}`)
});

module.exports = app;