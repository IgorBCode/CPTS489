export default function Battles() {
    return (
        <div className="content-container flex-fill">
            <h3 className="text-center mb-4">Active Battles</h3>
            <hr />
            {/* battles */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-header text-white board-battles-gradient-text">
                            <h2>Food VS Art</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Food Upvotes:</strong> 12,345
                            </p>
                            <p>
                                <strong>Art Upvotes:</strong> 10,987
                            </p>
                        </div>
                        <div className="card-footer">
                            <p className="text-danger">Battle ends in 48 hours!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center my-4">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-header text-white board-battles-gradient-text">
                            <h2>Cars VS Gaming</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Cars Upvotes:</strong> 2,955
                            </p>
                            <p>
                                <strong>Gaming:</strong> 5,437
                            </p>
                        </div>
                        <div className="card-footer">
                            <p className="text-danger">Battle ends in 120 hours!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}