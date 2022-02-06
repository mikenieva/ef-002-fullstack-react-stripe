// ./client/src/Auth/Register.js
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from './../../context/User/UserContext'

export default function Register() {

	const ctx = useContext(UserContext)

	const {
		registerUser
	} = ctx


	const [newUser, setNewUser] = useState({
		nombre: "",
		email: "",
		password: "",
		confirmarpassword: ""
	})

	const [errorMsg, setErrorMsg] = useState("")

	const handleChange = (e) => {
		e.preventDefault()

		setNewUser({
			...newUser,
			[e.target.name]: e.target.value
		})

	}

	const handleSubmit = async (e) => {
		
		e.preventDefault()

		if (newUser.password !== newUser.confirmarpassword) {
			return setErrorMsg("Tu contraseña de confirmación no coincide. Revisa nuevamente.")
		}


		const res = await registerUser(newUser)

		if (res) setErrorMsg(res)

	}


	return (
		<>
			<section className="flex flex-col justify-center py-8 mx-auto">
				<h2 className="text-center text-3xl font-bold mt-8">
					Crea tu cuenta
				</h2>
				<p className="mt-2 text-center text-sm">
					¿Ya tienes cuenta? &nbsp;
					<Link to="/iniciar-sesion">
						<a className="font-medium text-brand-light-purple underline">
							Inicia sesión
						</a>
					</Link>
				</p>
			</section>

			<section className="mt-8 px-4 mx-auto w-full max-w-md">
				<div>
					<form 
						onSubmit={(event) => { handleSubmit(event) }}
						className="space-y-4">
						<div>
							<label for="name" className="form-label">
								Nombre
							</label>
							<input
								onChange={(event) => { handleChange(event)}}
								name="name"
								type="text"
								className="form-input" 
							/>
						</div>

						<div>
							<label for="email" className="form-label">
								Email
							</label>
							<div className="mt-1">
								<input
									onChange={(event) => { handleChange(event)}}
									name="email"
									type="email"
									className="form-input" 
								/>
							</div>
						</div>

						<div>
							<label for="password" className="form-label">
								Password
							</label>
							<div className="mt-1">
								<input
									onChange={(event) => { handleChange(event)}}
									name="password"
									type="password"
									required
									className="form-input" 
								/>
							</div>
						</div>

						<div>
							<label for="password" className="form-label">
								Confirma tu password
							</label>
							<div className="mt-1">
								<input
									onChange={(event) => { handleChange(event)}}
									name="confirmarpassword"
									type="password"
									required
									className="form-input" 
									/>
							</div>
						</div>

						<div className='py-4'>
							<button type="submit" className="form-button">
								Crear cuenta
							</button>
						</div>

						<div>
							<p className="text-center text-red-800">{errorMsg}</p>
						</div>

					</form>
				</div>
			</section>
		</>
	)
}
