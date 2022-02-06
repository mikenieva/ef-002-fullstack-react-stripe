import axiosClient from "./axios"

const getToken = () => {
	
	const token = localStorage.getItem("token")

	if (token) {
		return axiosClient.defaults.headers.common["x-auth-token"] = token
	} 
	
	return delete axiosClient.defaults.headers.common["x-auth-token"]

}

export default getToken