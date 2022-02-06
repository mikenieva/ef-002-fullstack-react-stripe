const express	= require("express")
const router	= express.Router()	

const { check } = require("express-validator")

const userController	= require("./../controllers/userController")

const authorization 	= require("./../middleware/authorization")

router.post("/create", [
	check("name", "El nombre es obligatorio.").not().isEmpty(),
	check("email", "Agrega un email válido").isEmail(),
	check("password", "El password debe ser mínimo de 6 caracteres").isLength({ min: 6 })
]
, userController.create)

router.post("/login", userController.login)

router.get("/verifytoken", authorization, userController.verifyToken)

router.put("/update", authorization, userController.update)

module.exports = router