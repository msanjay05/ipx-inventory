const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./router/userRouter");
const inventoryRouter = require("./router/inventoryRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(inventoryRouter);

module.exports = app;
