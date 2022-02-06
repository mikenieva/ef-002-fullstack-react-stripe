// ./src/routes/Auth.js

import React, {useContext, useEffect, useState} from 'react'

import { Navigate } from 'react-router-dom'
import UserContext from '../context/User/UserContext'

export default function AuthRoute({ component: Component }) {
    
	const userCtx = useContext(UserContext)
    const { authStatus, verifyingToken } = userCtx

    const [loading, setLoading] = useState(true)

    useEffect( () => {
        verifyingToken()
        setLoading(false)

    }, [authStatus])

    return (
		<>
			{
				authStatus ?
				(<Navigate replace to="/" />)
				:
				(<Component/>)
			}
		</>
    )
    
}
