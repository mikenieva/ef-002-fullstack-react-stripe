const express 		= require("express")
const app			= express()
const cors			= require("cors")

require("dotenv").config()
const connectDB = require('./config/db')

connectDB()

app.use(cors())

app.use((req, res, next) => {
	if (req.originalUrl === '/api/checkout/create-order') {
	  next();
	} else {
	  express.json()(req, res, next);
	}
  });


app.use("/api/checkout", require("./routes/checkout"))
app.use("/api/pizzas", require("./routes/pizzas"))
app.use("/api/users", require("./routes/users"))

app.listen(process.env.PORT, () => {
	console.log(`Servidor trabajando en ${process.env.PORT}`)
})