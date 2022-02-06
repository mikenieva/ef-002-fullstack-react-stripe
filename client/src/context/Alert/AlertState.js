// ./src/context/User/UserState.js
import { useReducer } from 'react'

import AlertReducer from './AlertReducer'
import AlertContext from './AlertContext'

const AlertState = (props) => {

	// 1. INITIAL STATE
	const initialState = {
		show: false,
		msg: null,
		cta: null,
		ctaURL: ""
	}

	// 2. CONFIGURACIÓN DEL REDUCER
	const [globalState, dispatch] = useReducer(AlertReducer, initialState)

	// 3. FUNCIONES
	const setShowOn = (data) => {

		dispatch({
			type: "SHOW_ON",
			payload: data
		})
	}

	const setShowOff = () => {

		dispatch({
			type: "SHOW_OFF",
			payload: false
		})

	}


	// 4. RETORNO
	return (
		<AlertContext.Provider
			value={{
				show: globalState.show,
				msg: globalState.msg,
				cta: globalState.cta,
				ctaURL: globalState.ctaURL,
				setShowOff,
				setShowOn
			}}
		>

			{props.children}

		</AlertContext.Provider>

	)

}

export default AlertState