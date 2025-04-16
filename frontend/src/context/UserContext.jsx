import { createContext, useState, useEffect, useRef} from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const isLoading = useRef(true)
    const [user, setUser] = useState(null)
    const [boards, setBoards] = useState([])

    const fetchUserData = async() => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const token = await response.json()
                const response2 = await fetch(`/api/users/${token.user.id}`, {
                    method: 'GET'
                })
                
                setUser(await response2.json())
            } else {
                console.log("Not logged in")
                setUser(null)
            }
        } catch (err) {
            setUser(null)
        }
    }

    const getBoards = async () => {
        try {
            const response = await fetch('/api/boards/', {
                method: 'GET'
            });

            const data = await response.json()
            setBoards(data.boards)
            
            console.log("Fetched boards successfully" + data.boards)
        } catch (err) {
            console.log("Couldn't fetch boards")
        }
    }

    

    useEffect(() => {
        if (!isLoading.current) return
        fetchUserData()
        getBoards()
        isLoading.current = false
    }, [])

    return (
        <UserContext.Provider value={{ user, boards }}>
            {children}
        </UserContext.Provider>
    )
    
}



