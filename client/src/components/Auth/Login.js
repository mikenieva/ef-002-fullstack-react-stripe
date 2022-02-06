// ./client/src/Auth/Login.js
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/User/UserContext'


export default function Login() {

  const ctx = useContext(UserContext)

  const {
    loginUser
  } = ctx


  // 1. ESTADO LOCAL
  const [logUser, setLogUser] = useState({
    email: "",
    password: ""
  })

  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e) => {
    e.preventDefault()

    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const res = await loginUser(logUser)

    if (res) setErrorMsg(res)

    return


  }

  return (
    <>
      <section className="flex flex-col justify-center py-8 mx-auto">
        <h2 className="text-center text-3xl font-bold mt-8">
          Iniciar sesión
        </h2>
        <p className="mt-2 text-center text-sm">
          ¿Aún sin cuenta? &nbsp;
          <Link to="/registro">
            <a className="font-medium text-brand-light-purple underline">
              Regístrate
            </a>
          </Link>
        </p>
      </section>

      <section className="mt-8 px-4 mx-auto w-full max-w-md">
        <div>
          <form
            className="space-y-6"
            onSubmit={(e) => { handleSubmit(e) }}
          >
            <div>
              <label for="email" className="form-label">
                Tu correo electrónico
              </label>
              <div className="mt-1">
                <input
                  onChange={(evt) => { handleChange(evt) }}
                  name="email"
                  type="email"
                  className="form-input" />
              </div>
            </div>

            <div>
              <label for="password" className="form-label">
                Tu contraseña
              </label>
              <div className="mt-1">
                <input
                  onChange={(evt) => { handleChange(evt) }}
                  name="password"
                  type="password"
                  className="form-input" />
              </div>
            </div>

            <div>
              <button type="submit" className="form-button">
                Acceder a tu cuenta
              </button>
            </div>

            <div>
              <p className="text-center text-red-800">
                {errorMsg}
              </p>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}
