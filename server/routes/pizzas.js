const express 		= require("express")
const router		= express.Router()

const pizzaController	= require("./../controllers/pizzaController")

router.post("/create", pizzaController.create)

router.get("/readall", pizzaController.readAll)

router.get("/readone/:slug", pizzaController.readOne)

// 3. EXPORTACIONES
module.exports = router