const Pizza = require("./../models/Pizza")
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.create = async (req, res) => {

	const {
		name,
		currency,
		prices,
		img,
		description,
		slug
	} = req.body

	// STRIPE
	// A. PRODUCTO
	// CREAR EL PRODUCTO EN STRIPE
	try {

		const product = await stripe.products.create({
			name,
			description,
			images: [...img],
			metadata: {
				productDescription: description,
				slug
			}
		})

		// B. PRECIO
		// CREAR LOS PRECIOS PARA EL PRODUCTO EN STRIPE

		const stripePrices = await Promise.all(

			prices.map(async (e) => {

				return await stripe.prices.create({
					unit_amount: e.price,
					currency: currency,
					product: product.id,
					nickname: e.size,
					metadata: {
						size: e.size,
						priceDescription: e.description
					}
				});

			}))


		// 2. MODIFICACIÓN EN BASE DE DATOS

		const pizzaPrices = stripePrices.map(e => {
			return {
				id: e.id,
				size: e.metadata.size,
				priceDescription: e.metadata.priceDescription,
				price: e.unit_amount
			}
		})


		const newPizza = await Pizza.create({
			idProd: product.id,
			name: product.name,
			prices: [...pizzaPrices],
			img,
			currency,
			description: product.description,
			slug
		})

		// DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
		res.json({
			msg: "Pizza creada con éxito",
			data: newPizza
		})

	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error creando la pizza"
		})

	}


}

exports.readAll = async (req, res) => {

	try {

		const pizzas = await Pizza.find({})

		res.json({
			msg: "Pizzas obtenidas con éxito.",
			data: pizzas
		})


	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error obteniendo los datos"
		})

	}

}

exports.readOne = async (req, res) => {

	const { slug } = req.params

	try {

		const pizza = await Pizza.findOne({ slug })

		if (pizza === null) {
			return res.status(400).json({
				msg: "Pizza no encontrada."
			})
		}

		res.json({
			msg: "Pizza obtenida con éxito.",
			data: pizza
		})

	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "hubo un error obteniendo los datos.",
			error: error
		})
	}
}


