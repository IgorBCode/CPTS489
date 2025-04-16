import { createContext, useState, useEffect, useRef } from 'react';

export const UserContext = createContext();

export const getUser = async () => {
    try {
        const tokenData = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include',
        });
        const token = await tokenData.json();

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
        if (!isLoading.current) return;

        const fetchData = async () => {
            const userData = await getUser();
            const boardsData = await getBoards();

            setUser(userData);
            setBoards(boardsData);
        };

        fetchData();
        isLoading.current = false;
    }, []);

    const updateUser = async () => {
        setUser(await getUser());
    };

    const updateBoards = async () => {
        setBoards(await getBoards());
    };

    const refreshData = async () => {
        const userData = await getUser();
        const boardsData = await getBoards();
        setUser(userData);
        setBoards(boardsData);
    };

    return (
        <UserContext.Provider value={{ user, boards, updateUser, updateBoards, refreshData }}>
            {children}
        </UserContext.Provider>
    );
};
