// ./src/routes/Private.js
import React, {useContext, useEffect, useState} from 'react'

import {Navigate} from 'react-router-dom'

import UserContext from '../context/User/UserContext'


export default function PrivateRoute({ component: Component, ...props }) {

    const userCtx = useContext(UserContext)
    
    const { authStatus, verifyingToken } = userCtx

    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        await verifyingToken()
        setLoading(false)

    }, [authStatus])

	if(loading) return null

    return (
		<>
			{
				authStatus ?
				(<Component/>)
				:
				(<Navigate replace to="/iniciar-sesion" />)
			}
		</>
    )
    
}
