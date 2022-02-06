import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <>
      <main className="text-center px-4 mt-24 mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Aplicación de Pizzas
        </h1>
        <p className="mt-3 mx-auto text-gray-500">
          Accede al menú y ordena una pizza.
        </p>
        <section className="mt-16 mx-auto max-w-md">
          <article>
            <Link to="/pizzas" className="btn-product">
              Ver el menú de pizzas
            </Link>
          </article>
        </section>
      </main>
    </>
  )
}
