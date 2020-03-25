const express = require("express");
require("../src/db/mongoose");
// const User = require("./models/user");
// const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// SERVER LISTEN TO PORT
app.listen(port, () => console.log("Server is on port " + port));