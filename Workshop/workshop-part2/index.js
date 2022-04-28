require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalRouter = require("./const/router.const");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(globalRouter);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Server is up at port: ${PORT}`);
});

