import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import UserContext from '../../context/User/UserContext'

import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'

import PizzaLogo from './../../assets/pizza-logo.jpg'
import AlertContext from '../../context/Alert/AlertContext'
import PizzaContext from '../../context/Pizza/PizzaContext'

export default function Header() {

	const userCtx = useContext(UserContext)

	const {
		currentUser,
		cart,
		authStatus,
		verifyingToken,
		logoutUser,
		getCart,
		editCart,
		setLoading
	} = userCtx

	const alertCtx = useContext(AlertContext)

	const {
		show,
		msg,
		cta,
		ctaURL,
		setShowOn,
		setShowOff
	} = alertCtx


	const pizzaCtx = useContext(PizzaContext)

	const {
		currentPizza,
	} = pizzaCtx

	const [total, setTotal] = useState(0)

	const [localPrices, setLocalPrices] = useState([])

	useEffect(() => {

		setLoading(true)
		verifyingToken()
		getCart()
		setLoading(false)

	}, [])

	useEffect(() => {

		const fetchCart = async () => {
			await getCart()
		}

		fetchCart()

	}, [currentUser])

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

	}, [cart, currentUser])

	useEffect(() => {

		const getTotalProducts = () => {

			return cart.reduce((acc, cv) => {

				return acc + cv.quantity

			}, 0)
		}

		const total = getTotalProducts()

		setTotal(total)

	}, [localPrices])


	const { search } = useLocation()

	useEffect(() => {

		const sp = new URLSearchParams(search);

		const success = sp.get("success")
		const canceled = sp.get("canceled")

		if (success) {

			setShowOn({
				show: true,
				msg: "Pago realizado con éxito",
				cta: "Ve tu recibo",
				ctaURL: "/perfil"
			})

			return editCart([])
		}

		if (canceled) return setShowOn({
			show: true,
			msg: "Hubo problemas con el pago, revisa nuevamente.",
			cta: "Ir al carrito",
			ctaURL: "/carrito"
		})

	}, [])

	if (!localPrices) return null

	return (
		<header className="bg-brand-yellow">
			<nav className="flex justify-between mx-8 py-4">
				<ul className="flex items-center">
					<li>
						<Link to="/">
							<img
								className="h-12"
								src={PizzaLogo}
								alt="Pizza Logo"
							/>
						</Link>
					</li>
					<li className="hidden ml-10 text-gray-900 md:block">
						<Link to="/pizzas" className="font-medium">
							Menú
						</Link>
					</li>
				</ul>
				<section className="flex items-center justify-end">
					{
						authStatus ?
							<>
								<Link to="/perfil" className="btn-nav">
									Perfil
								</Link>

								<Link
									to="/"
									className="btn-nav"
									onClick={() => logoutUser()}
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
									</svg>
								</Link>

								<Link to="/carrito" className="btn-cart">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
									</svg>
									<span className="btn-cart-quantity">
										{total}
									</span>
								</Link>
							</>
							:
							<>
								<Link to="/registro" className="btn-nav">
									Crear cuenta
								</Link>
								<Link to="/iniciar-sesion" className="btn-nav">
									Iniciar sesión
								</Link>
							</>
					}
				</section>
			</nav>

			{/* ALERTA */}
			<section
				className="flex fixed inset-0 px-4 pt-6 pointer-events-none"
			>
				<div
					className="w-full flex flex-col items-end"
				>
					<Transition
						show={show}
						as={Fragment}
					>
						<div className="w-full bg-white shadow-lg border pointer-events-auto p-4 lg:w-1/4 ">
							<section className="flex">
								<figure>
									<img
										className="pt-1 h-10 w-10"
										src={PizzaLogo}
										alt="Admin Logo"
									/>
								</figure>

								<article className="ml-8 flex-1">
									<h2 className="text-md font-bold">
										Notificaciones
									</h2>
									<p className="mt-1 text-sm text-gray-500">
										{msg}
									</p>

									<Link
										to={ctaURL}
										onClick={() => {
											setShowOff()
										}}
									>
										<button
											type="button"
											className="mt-4 py-2 px-4  text-sm font-medium text-white bg-brand-purple"
										>
											{cta}
										</button>
									</Link>

								</article>
								<article className="ml-4">
									<button
										className="text-black"
										onClick={() => {
											setShowOff()
										}}
									>
										<XIcon className="h-5 w-5" />
									</button>
								</article>
							</section>
						</div>
					</Transition>
				</div>
			</section>
		</header>
	)
}
