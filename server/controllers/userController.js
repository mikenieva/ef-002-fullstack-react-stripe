const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

const Cart = require("./../models/Cart")
const User = require("./../models/User")

exports.create = async (req, res) => {

	// REVISIÓN DE VALIDACIONES
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json({
			msg: "Hay errores en tu formulario. Intenta nuevamente.",
			error: errors.array()
		})
	}

	const {
		name,
		lastname,
		country,
		address,
		zipcode,
		email,
		password
	} = req.body

	try {

		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		// CREAR CART PARA EL USUARIO
		const newCart = await Cart.create({})

		const newUser = await User.create({
			name,
			lastname,
			country,
			address,
			zipcode,
			email,
			password: hashedPassword,
			cart: newCart
		})

		const payload = {
			user: {
				id: newUser._id
			}
		}

		jwt.sign(
			payload,
			process.env.SECRET,
			{
				expiresIn: 360000
			},
			(error, token) => {
				if (error) throw error

				res.json({
					msg: "Usuario creado con éxito.",
					data: token
				})
			}
		)


	} catch (error) {
		// 2B. EN CASO DE ERROR CON AWAIT
		console.log(error)

		res.status(500).json({
			msg: "Hubo un error con la creación de usuario. Intenta nuevamente con otro usuario y/o email.",
			error: error
		})

	}


}

exports.login = async (req, res) => {

	const { email, password } = req.body

	try {

		const foundUser = await User.findOne({ email })

		if (!foundUser) {
			return res.status(400).json({
				msg: "El usuario o la contraseña son incorrectos."
			})
		}

		const verifiedPass = await bcryptjs.compare(password, foundUser.password)

		if (!verifiedPass) {
			return await res.status(400).json({
				msg: "El usuario o la contraseña no coinciden."
			})
		}

		const payload = {
			user: {
				id: foundUser.id
			}
		}

		jwt.sign(
			payload,
			process.env.SECRET,
			{
				expiresIn: 360000
			},
			(error, token) => {
				if (error) throw error

				res.json({
					msg: "Inicio de sesión exitoso.",
					data: token
				})
			}
		)

		return


	} catch (error) {
		console.log(error)
		res.status(500).json({
			msg: "Hubo un problema con la autenticación.",
			data: error
		})
	}

}

exports.verifyToken = async (req, res) => {

	try {

		const foundUser = await User.findById(req.user.id).select("-password")

		return res.json({
			msg: "Datos de usuario encontrados.",
			data: foundUser
		})


	} catch (error) {
		console.log(error)

		res.status(500).json({
			msg: "El usuario no se encuentra identificado."
		})
	}

}

exports.update = async (req, res) => {

	const newDataForOurUser = req.body

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			newDataForOurUser,
			{ new: true }
		).select("-password")

		res.json(
			{
				msg: "Usuario actualizado con éxito.",
				data: updatedUser
			}
		)

	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error actualizando el usuario."
		})

	}

}
