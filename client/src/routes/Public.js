// import React, {useContext, useEffect, useState} from 'react'

// import UserContext from '../context/User/UserContext'


// export default function PublicRoute({ component: Component, ...props }) {
//     const userCtx = useContext(UserContext)
    
//     const { authStatus, verifyingToken } = userCtx

//     const [loading, setLoading] = useState(true)

//     useEffect(async () => {
//         await verifyingToken()
//         setLoading(false)

//     }, [authStatus])

//     return (
//             (<Component />)
//     )
    
// }
