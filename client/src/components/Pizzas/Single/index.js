import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import PizzaContext from '../../../context/Pizza/PizzaContext'
import UserContext from '../../../context/User/UserContext'

import AlertContext from '../../../context/Alert/AlertContext'


export default function Single() {

	const params = useParams()
	const { slug } = params

	const pizzaCtx = useContext(PizzaContext)

	const {
		currentPizza,
		getPizza
	} = pizzaCtx

	const {
		name,
		description,
		img,
		prices
	} = currentPizza

	const userCtx = useContext(UserContext)

	const {
		authStatus,
		cart,
		editCart,
		getCart
	} = userCtx

	const alertCtx = useContext(AlertContext)

	const {
		setShowOn
	} = alertCtx



	const [form, setForm] = useState([])

	const [localPrices, setLocalPrices] = useState([])



	// DESPUÉS DEL RENDER, GENERAMOS LOS VALORES DE PIZZA
	useEffect(() => {

		const fetchPizza = async () => {

			await getCart()

		}

		fetchPizza()

		getPizza(slug)

	}, [])


	// DESPUÉS DEL RENDER, ESTABLECEMOS LOS PRECIOS LOCALMENTE PARA CONSUMIRSE.
	useEffect(() => {

		if (currentPizza.id === null) {
			return null
		}

		const updatedPrices = currentPizza.prices.map((firstElement) => {
			let comparisonCart = cart.filter(secondElement => {
				return firstElement.id === secondElement.priceID
			})

			const [cartQuantity] = comparisonCart

			return {
				...firstElement,
				quantity: cartQuantity ? cartQuantity.quantity : 0
			}

		})

		setLocalPrices([
			...updatedPrices
		])

		setForm([...cart])

	}, [prices])

	const handleChange = (e) => {

		if (e.target.value === "0") {

			const filteredData = form.filter(element => {
				return element.priceID !== e.target.name
			})

			return setForm(filteredData)

		}

		const newData = {
			priceID: e.target.name,
			priceDescription: e.target.getAttribute("data-pizza-pricedescription"),
			size: e.target.getAttribute("data-pizza-size"),
			name: e.target.getAttribute("data-pizza-name"),
			quantity: e.target.value,
			price: e.target.getAttribute("data-pizza-price"),
			img: e.target.getAttribute("data-pizza-img"),
			slug: e.target.getAttribute("data-pizza-slug"),
		}

		const filteredData = form.findIndex(element => {
			return element.priceID === e.target.name
		})

		if (filteredData === -1) {
			return setForm([
				...form,
				newData
			])
		}

		const updatedData = form.map(elt => {
			return elt.priceID === e.target.name ? newData : elt
		})


		return setForm(updatedData)

	}

	const handleSubmit = async (e) => {

		e.preventDefault()

		const resMsg = await editCart(form)

		setShowOn({
			show: true,
			msg: resMsg,
			cta: "Ver carrito",
			ctaURL: "/carrito"
		})

	}

	if (!prices) return null

	const quantityOptions = [0, 1, 2, 3, 4, 5]

	return (
		<>
			<main className="max-w-7xl mx-auto pt-16 pb-24 px-8 lg:grid lg:grid-cols-2 lg:gap-x-16">
				<section>
					<h1 className="text-4xl font-bold">{name}</h1>
					<div className="mt-4">
						<p className="text-gray-500">{description}</p>
					</div>
				</section>

				<figure className="mt-8 col-start-2 row-span-2">
					<img src={img[0]} alt={description} className="w-full object-center object-cover" />
				</figure>



				<div className="mt-10 max-w-lg col-start-1">
					<section>
						<form onSubmit={(e) => { handleSubmit(e) }}>
							<div className="sm:flex sm:justify-between">
								<fieldset>
									<div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
										{
											localPrices.map(e => {
												return (
													<div key={e.id}>
														<label className="block border border-gray-300 p-4 focus:outline-none">

															<p className="text-base font-medium text-gray-900">
																{e.size}
															</p>
															<p id="size-choice-1-description" className="mt-1 text-sm text-gray-500">
																{e.priceDescription}
															</p>
															<p id="size-choice-1-description" className="mt-1 text-sm text-gray-500">
																$ {(e.price / 100).toFixed(2)}
															</p>

															{

																authStatus ?
																	<>

																		<select
																			className="w-full mt-8 mb-4 py-2"
																			type="option"
																			name={`${e.id}`}
																			data-pizza-name={name}
																			data-pizza-size={e.size}
																			data-pizza-pricedescription={e.priceDescription}
																			data-pizza-price={e.price}
																			data-pizza-img={img[0]}
																			data-pizza-slug={slug}
																			onChange={(evt) => { handleChange(evt) }}
																		>




																			{quantityOptions.map(elt => {
																				return (
																					<>
																						{
																							elt === e.quantity ?
																								(<option selected value={elt}>{elt}</option>) :
																								(<option value={elt}>{elt}</option>)}
																					</>
																				)
																			})

																			}
																		</select>
																	</>
																	: null
															}

														</label>
													</div>
												)
											})
										}
									</div>
								</fieldset>
							</div>

							<div className="mt-10">

								{
									authStatus ?

										<button type="submit" className="btn-product">
											{
												cart.length !== 0 ? "Modificar carrito" : "Agregar al carrito"
											}
										</button>
										:
										<Link to="/registro">
											<button type="submit" className="btn-product">
												Regístrate para crear un carrito
											</button>
										</Link>
								}
							</div>

						</form>
					</section>
				</div>

			</main>
		</>
	)
}
