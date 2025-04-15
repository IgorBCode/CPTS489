import { createContext, useState, useEffect} from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const fetchUserData = async() => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.user)
                console.log("User Context Created")
            } else {
                console.log("Couldn't setUser")
                setUser(null)
            }
        } catch (err) {
            setUser(null)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
    
}



