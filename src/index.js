const express = require("express");
require("../src/db/mongoose");
// const User = require("./models/user");
// const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request are disable')
//     } else {
//         next()
//     }
// })

// MAINTENANCE MIDDLEWARE
// app.use((req, res, next) => {
//     res.status(500).send('We are under manteinance. Please try again later...');
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// SERVER LISTEN TO PORT
app.listen(port, () => console.log("Server is on port " + port));

const pet = {
  name: 'Hal'
}

pet.toJSON = function () {
  return {}
}
console.log(JSON.stringify(pet))