import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const getUser = async () => {
    try {
        const tokenData = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include',
        });
        const token = await tokenData.json();

        if (!token.user) {
            return null;
        }

        const userData = await fetch(`/api/users/${token.user.id}`, {
            method: 'GET',
            credentials: 'include',
        });
        const user = await userData.json();

        console.log(token.message);

        return user;
    } catch (err) {
        console.log("Couldn't get user");
        return null;
    }
};

export const getBoards = async () => {
    try {
        const boardsData = await fetch('/api/boards/', {
            method: 'GET',
        });
        const boards = await boardsData.json();

        console.log('Fetched boards successfully');

        return boards;
    } catch (err) {
        console.log("Couldn't fetch boards");
        return [];
    }
};

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                const boardsData = await getBoards();

                setUser(userData);
                setBoards(boardsData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateUser = async () => {
        const userData = await getUser();
        setUser(userData);
        return userData;
    };

    const updateBoards = async () => {
        const boardsData = await getBoards();
        setBoards(boardsData);
        return boardsData;
    };

    const refreshData = async () => {
        const userData = await getUser();
        const boardsData = await getBoards();
        setUser(userData);
        setBoards(boardsData);
        return { user: userData, boards: boardsData };
    };

    return (
        <UserContext.Provider
            value={{ user, boards, isLoading, updateUser, updateBoards, refreshData }}
        >
            {children}
        </UserContext.Provider>
    );
};
