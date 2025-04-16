import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { UserContext } from '../context/UserContext';
import styles from '../styles/Boards.module.css';
import SearchBar from '../components/SearchBar.jsx';

export default function Boards() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [boards, setBoards] = useState([]);

    // fetches boards after being redirected here to display newly created board
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await fetch('/api/boards', {
                    credentials: 'include',
                });
                const data = await res.json();
                setBoards(data);
            } catch (err) {
                console.error('Failed to fetch boards', err);
            }
        };

        fetchBoards();
    }, []);

    // Static board data (kept separate from dynamic boards)
    // const STUBBED_BOARDS = [
    //     {
    //         _id: 'cars',
    //         name: '🚗 Cars',
    //         description: 'Share your car pics, mod/fix tips, and talk about anything car related.',
    //     },
    //     {
    //         _id: 'food',
    //         name: '🍔 Food',
    //         description:
    //             'Share recipes, restaurant recommendations, and anything else food related.',
    //     },
    //     {
    //         _id: 'webdev',
    //         name: '💻 WebDev',
    //         description: 'A place where you can learn how to center a div.',
    //     },
    //     {
    //         _id: 'pets',
    //         name: '🐶 Pets',
    //         description: 'Join other pet owner to discuss anything related to our furry friends.',
    //     },
    //     {
    //         _id: 'gaming',
    //         name: '🎮 Gaming',
    //         description: 'All things video game related.',
    //     },
    //     {
    //         _id: 'art',
    //         name: '🎨 Art',
    //         description: 'Join a community of artists sharing, exploring, and appreciating art.',
    //     },
    //     {
    //         _id: 'movies',
    //         name: '🎥 Movies',
    //         description: 'Join the discussion about all things movie related',
    //     },
    // ];

    useEffect(() => {
        const allBoards = [...boards];

        if (searchTerm.trim() === '') {
            setFilteredBoards(allBoards);
        } else {
            const filtered = allBoards.filter(
                board =>
                    board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    board.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBoards(filtered);
        }
    }, [searchTerm, boards]);

    const handleSearch = e => {
        e.preventDefault();
    };

    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className={styles['content-container']}>
                <h1 className="text-center">Explore Communities</h1>
                {/* list of boards */}
                <div className={`row ${styles['row']}`}>
                    <div className="row align-items-start">
                        <div className="row align-items-start">
                            <div className="col">
                                <NavLink to="create" className="btn board-battles-gradient-text">
                                    Create Board
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <SearchBar
                                    searchTerm={searchTerm}
                                    handleSearchChange={handleSearchChange}
                                    handleSearch={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    {filteredBoards.length > 0 ? (
                        filteredBoards.map(board => (
                            <div className={`col-md-4 mt-3`} key={board._id}>
                                <div className={`card p-3 h-100`}>
                                    <h5 className="card-title">{board.name}</h5>
                                    <p className={`text-muted clamp-text flex-wrap flex-fill`}>
                                        {board.description}
                                    </p>
                                    <NavLink
                                        to={`${board._id}`}
                                        className="btn btn-primary board-battles-gradient-text "
                                    >
                                        Explore
                                    </NavLink>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center mt-4">
                            <p>No boards found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
