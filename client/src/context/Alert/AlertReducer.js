const reducer = (globalState, action) => {
	
	switch(action.type){

		case "SHOW_ON":
			return {
				...globalState,
				show: action.payload.show,
				msg: action.payload.msg,
				cta: action.payload.cta,
				ctaURL: action.payload.ctaURL
			}

		case "SHOW_OFF":
			return {
				...globalState,
				show: action.payload,
				msg: null,
				cta: null,
				ctaURL: ""
			} 

		default:
			return globalState
	}

}

export default reducer