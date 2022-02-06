export default (globalState, action) => {
	switch (action.type){

		case "OBTENER_PIZZAS":
			return {
				...globalState,
				pizzas: action.payload
			}


		case "OBTENER_PIZZA":
			return {
				...globalState,
				currentPizza: action.payload
			}

		default:
			return globalState

	}


}