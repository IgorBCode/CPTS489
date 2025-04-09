import Card from '../components/Card.jsx';

export default function Home() {
    return (
        <main className="container">
            <div className="row">
                <Card
                    postTitle="How much cheese is too much cheese?"
                    postUser="charlie"
                    postDate={new Date(2025, 4 - 1, 6, 18, 35, 0, 0)}
                    upvotes={2120}
                    downvotes={4}
                    boardName="Food"
                    commentCount={1645}
                />
                <Card
                    postTitle="How do I center a div?"
                    postUser="kokomanchester"
                    postDate={new Date(2025, 4 - 1, 6, 18, 36, 0, 0)}
                    upvotes={850}
                    downvotes={2}
                    boardName="Web Dev"
                    commentCount={983}
                />
                <Card
                    postTitle="Movies coming to Netflix in March"
                    postUser="painterkaaba"
                    postDate={new Date(2025, 4 - 1, 6, 15, 38, 0, 0)}
                    upvotes={714}
                    downvotes={325}
                    boardName="Movies"
                    commentCount={1502}
                />
            </div>
        </main>
    );
}