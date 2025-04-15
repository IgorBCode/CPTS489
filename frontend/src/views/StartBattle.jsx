export default function StartBattle() {
    return (
        <>
            <h1 className="text-center">Board Battle</h1>
            <div className="content-container">
                <h3 className="text-center mb-4">Start Battle!</h3>
                <hr />
                <div className="container text-center">
                    <Form>
                        <div className="row">
                            <div className="col">
                                <h3>Board 1</h3>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Choose your fighter</option>
                                    <option value={1}>Cars</option>
                                    <option value={2}>Food</option>
                                    <option value={3}>WebDev</option>
                                    <option value={4}>Pets</option>
                                    <option value={5}>Gaming</option>
                                    <option value={6}>Art</option>
                                    <option value={7}>Movies</option>
                                </select>
                            </div>
                            <div className="col m-4">
                                <img src="images/vs_img.png" className="vs-img" />
                            </div>
                            <div className="col">
                                <h3>Board 2</h3>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected="">Choose your fighter</option>
                                    <option value={1}>Cars</option>
                                    <option value={2}>Food</option>
                                    <option value={3}>WebDev</option>
                                    <option value={4}>Pets</option>
                                    <option value={5}>Gaming</option>
                                    <option value={6}>Art</option>
                                    <option value={7}>Movies</option>
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-danger btn-lg mt-2">Fight!</button>
                    </Form>
                </div>
            </div>
        </>
    );
}