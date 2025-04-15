export default function Awards() {
    return (
        <>
            <h1 className="text-center">Your Trophy Case</h1>
            <div className="content-container">
                <h3 className="text-center mb-4">Awards</h3>
                <hr />
                {/* awards */}
                <div className="row g-3">
                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="award-card text-center p-3">
                            <img
                                src="https://media.tenor.com/AUhg0Aq_5gUAAAAi/orange-justice-kid-orange.gif"
                                alt="Trophy"
                                className="award-img"
                            />
                            <p className="mt-2">1st win</p>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="award-card text-center p-3">
                            <img
                                src="https://media1.giphy.com/media/OHs6JJvRA4v7hsxuzF/giphy.gif"
                                alt="Award"
                                className="award-img"
                            />
                            <p className="mt-2">Highest Scoring post</p>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="award-card text-center p-3">
                            <img
                                src="https://media.tenor.com/YTnbHwGQFUQAAAAi/coin-mario-bros-arcade.gif"
                                alt="Coin"
                                className="award-img"
                            />
                            <p className="mt-2">Battle Win</p>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="award-card text-center p-3">
                            <img
                                src="https://media.tenor.com/c7LVjFZrBmIAAAAi/pepe-the-frog-pepe.gif"
                                alt="Star"
                                className="award-img"
                            />
                            <p className="mt-2">Engagement King</p>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-md-3">
                        <div className="award-card text-center p-3">
                            <img
                                src="https://media.tenor.com/rIvmcq4to6QAAAAi/0.gif"
                                alt="Medal"
                                className="award-img"
                            />
                            <p className="mt-2">Team Player</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}