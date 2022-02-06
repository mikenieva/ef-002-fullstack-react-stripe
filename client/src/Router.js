// ./client/src/Router.js

// 1. IMPORTACIONES
import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './components/Home'

import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Profile from './components/Profile'

import Auth from './routes/Auth'
import Private from './routes/Private'

import UserState from './context/User/UserState'

import ListPizzas from './components/Pizzas/List'
import SinglePizza from './components/Pizzas/Single'
import Checkout from './components/Checkout'
import PizzaState from './context/Pizza/PizzaState'
import AlertState from './context/Alert/AlertState'



// 2. FUNCIÓN
const Router = () => {

	return (
		<>
		<AlertState>
			<UserState>
				<PizzaState>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout />} >
								<Route index element={<Home />} />
								<Route
									path="registro"
									element={<Auth component={Register} />}
								/>
								<Route
									path="iniciar-sesion"
									element={<Auth component={Login} />}
								/>
								<Route
									path="perfil"
									element={<Private component={Profile} />}
								/>
								<Route
									path="carrito"
									element={<Private component={Checkout} />}
								/>
								<Route
									path="pizzas"
									element={<ListPizzas />}
								/>
								<Route
									path="pizzas/:slug"
									element={<SinglePizza />}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</PizzaState>
			</UserState>
		</AlertState>
		</>
	)
}


// 3. EXPORTACIÓN
export default Router