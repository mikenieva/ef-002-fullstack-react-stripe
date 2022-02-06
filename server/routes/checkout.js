const express 		= require("express")
const router		= express.Router()

const authorization = require("../middleware/authorization")

const checkoutController	= require("../controllers/checkoutController")




// CHECKOUT CON STRIPE
router.get("/create-checkout-session", authorization, checkoutController.createCheckoutSession)

// ÓRDENES
// CREAR
router.post("/create-order",express.raw({type: 'application/json'}), checkoutController.createOrder)

// CARRITO DE COMPRAS
// CREAR
router.post("/create-cart", checkoutController.createCart)

// LEER
router.get("/get-cart", authorization, checkoutController.getCart)

// EDITAR
router.put("/edit-cart", authorization, checkoutController.editCart)


module.exports = router