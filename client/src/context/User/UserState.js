// ./src/context/User/UserState.js
import { useReducer, useContext } from 'react'

import UserReducer from './UserReducer'
import UserContext from './UserContext'
import axiosClient from './../../config/axios'
import getToken from '../../config/token'

const UserState = (props) => {

	// 1. INITIAL STATE
	const initialState = {
		currentUser: {
			name: "",
			lastname: "",
			country: "",
			address: "",
			email: "",
			receipts: [],
			zipcode: 0
		},
		cart: [],
		authStatus: false,
		globalLoading: false,
		sessionURL: null
	}

	// 2. CONFIGURACIÓN DEL REDUCER
	const [globalState, dispatch] = useReducer(UserReducer, initialState)


	// 3. FUNCIONES
	const registerUser = async (form) => {


		try {
			const res = await axiosClient.post("/users/create", form)

			const token = res.data.data

			dispatch({
				type: "REGISTRO_EXITOSO",
				payload: token
			})

			return

		} catch (error) {

			return error.response.data.msg

		}


	}

	const loginUser = async (form) => {

		try {

			const res = await axiosClient.post("/users/login", form)

			const token = res.data.data

			dispatch({
				type: "LOGIN_EXITOSO",
				payload: token
			})

			return

		} catch (error) {

			return error.response.data.msg

		}



	}

	const verifyingToken = async () => {

		getToken()

		try {

			const res = await axiosClient.get("/users/verifytoken")

			const userData = res.data.data

			dispatch({
				type: "GET_DATA_USER",
				payload: userData
			})

		} catch (error) {

			return
		}

	}

	const logoutUser = async () => {

		dispatch({
			type: "LOGOUT_USUARIO"
		})

	}

	const editCart = async (data) => {

		getToken()

		try {

			const res = await axiosClient.put("/checkout/edit-cart", { products: data })

			await getCart()

			return res.data.msg

		} catch (error) {

			return
		}

	}

	const getCart = async () => {

		getToken()

		try {
			const res = await axiosClient.get("/checkout/get-cart")

			dispatch({
				type: "GET_CART",
				payload: res.data.cart.products
			})

		} catch (error) {

			return

		}

	}


	const setLoading = (status) => {

		dispatch({
			type: "CHANGE_STATUS_LOADING",
			dispatch: status
		})
	}

	const getCheckoutSession = async () => {

		getToken()

		const res = await axiosClient.get("checkout/create-checkout-session")

		dispatch({
			type: "GET_CHECKOUT_SESSION",
			payload: res.data.session_url
		})

	}

	const userSubmitForm = async (dataform) => {

		getToken()

		await axiosClient.put("users/update", dataform)

	}


	// 4. RETORNO
	return (
		<UserContext.Provider
			value={{
				currentUser: globalState.currentUser,
				cart: globalState.cart,
				authStatus: globalState.authStatus,
				globalLoading: globalState.globalLoading,
				sessionURL: globalState.sessionURL,
				registerUser,
				loginUser,
				verifyingToken,
				logoutUser,
				editCart,
				getCart,
				setLoading,
				getCheckoutSession,
				userSubmitForm
			}}
		>

			{props.children}

		</UserContext.Provider>

	)

}

export default UserState