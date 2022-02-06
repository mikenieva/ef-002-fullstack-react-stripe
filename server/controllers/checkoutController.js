const Cart = require("../models/Cart")
const User = require("../models/User")

const stripe = require('stripe')(process.env.STRIPE_KEY);


// STRIPE CHECKOUT
exports.createCheckoutSession = async (req, res) => {

	const userID = req.user.id

	const foundUser = await User.findOne({_id: userID})

	const foundCart = await Cart.findById(foundUser.cart)
		.populate({
			path: "products"
	})

	const line_items = foundCart.products.map(e => {

		return {
			price: e.priceID,
			quantity: e.quantity
		}

	})

	const session = await stripe.checkout.sessions.create(
		{
			line_items,
			mode: 'payment',
			success_url: `${process.env.REACT_BASE_URL}/?success=true`,
			cancel_url: `${process.env.REACT_BASE_URL}/?canceled=true`,
			customer_email: foundUser.email
  		});

	res.json({
		"session_url": session.url,
		"session": session
		});

};

exports.createOrder = async (req, res) => {

	// SECCIÓN DE SEGURIDAD PARA STRIPE
	const sig = req.headers['stripe-signature']
	const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET
	
	let event;

	try {
	// SE REALIZA UNA REVISIÓN DE SEGURIDAD - CONFIRMAR QUE LA PETICIÓN VIENE DE LOS SERVIDORES DE STRIPE
	  event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		console.log(err)
	  	res.status(400).send(`Hubo un problema relacionado con el evento.`);
	  return;
	}

	switch (event.type) {
		case 'payment_intent.succeeded':
			
			const paymentIntent = event.data.object;
			
			const email = paymentIntent.charges.data[0].billing_details.email

			const receiptURL = paymentIntent.charges.data[0].receipt_url

			const receiptID = receiptURL.split('/').filter((item) => item).pop()

			const amount = paymentIntent.amount

			const date_created = paymentIntent.charges.data[0].created

			await User.findOneAndUpdate(
				{ email },
				{
						$push: {
							receipts: {
								receiptURL,
								receiptID,
								date_created,
								amount
							}
						}
				},
				{ new: true }
			)

		  break;
		default:
		  console.log(`Unhandled event type ${event.type}`);
	  }
  
	res.send();

}

// CARRITO DE COMPRAS
// CREAR
exports.createCart = async (req, res) => {

	// CREAR UN CARRITO DE COMPRAS
	const newCart = await Cart.create(req.body)
	
	res.json({
		cart: newCart
	})

}

// LEER
exports.getCart = async (req, res) => {
	
	const userID = req.user.id

	const foundUser = await User.findOne({_id: userID})

	const foundCart = await Cart.findOne({_id: foundUser.cart})

	res.json({
		cart: foundCart
	})

}

exports.editCart = async (req, res) => {

	const userID = req.user.id

	const foundUser = await User.findOne({_id: userID})

	// TOMAR LOS NUEVOS DATOS
	const {products} = req.body

	// EDITAR EL CART
	const updatedCart = await Cart.findByIdAndUpdate(
		foundUser.cart,
		{
			products
		},
		{ new: true }
	)

	// DEVOLVER EL VALOR DEL CART
	res.json({
		msg: "Tu carrito fue actualizado",
		updatedCart
	})

}