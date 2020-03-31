const app = require('./app')
const port = process.env.PORT

// SERVER LISTEN TO PORT
app.listen(port, () => console.log("Server is on port " + port));