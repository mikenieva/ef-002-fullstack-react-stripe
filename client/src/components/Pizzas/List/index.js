import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PizzaContext from '../../../context/Pizza/PizzaContext'

export default function List() {

	const pizzaCtx = useContext(PizzaContext)

	const {
		pizzas,
		getPizzas
	} = pizzaCtx

	useEffect(() => {
		getPizzas()
	}, [])

	return (
		<>
			<section className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 gap-y-4 gap-x-12 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-2 flex-column">
				{
					pizzas.length === 0 ?
						<p>No hay pizzas aún</p>
						:
						pizzas.map(e => {
							return (
								<div key={e._id} className="border flex flex-col ">
									<div className="bg-gray-200 ">
										<Link to={`/pizzas/${e.slug}`}>
											<img src={e.img[0]} alt={e.description} className="w-full h-64 object-center object-cover" />
										</Link>
									</div>
									<div className="flex-1 p-4 space-y-2 flex flex-col">
										<h3 className="text-xl font-bold text-gray-900">
											{e.name}
										</h3>
										<p className="text-gray-500 pb-8">
											{e.description}
										</p>
										<Link to={`/pizzas/${e.slug}`} className="btn-product">
											<button type="button" className="w-full">
												Ver pizza
											</button>
										</Link>
									</div>
								</div>
							)
						})
				}
			</section>
		</>
	)
}
