import {useEffect, useState} from "react";
import "./App.css";

function App() {
    const [posts, setPosts] = useState([]);
    const [commetnsVisible, setCommetnsVisible] = useState({});
    const [arrComments, setArrComments] = useState({});

    const getPosts = () => {
        fetch("https://jsonplaceholder.typicode.com/posts/")
            .then((response) => response.json())
            .then((posts) => setPosts(posts))
            .catch((error) => console.log(error));
    };

    const getPostId = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((res) => res.json())
            .then((comments) => {
                setArrComments({...arrComments, [id]: comments});
                setCommetnsVisible({...commetnsVisible, [id]: true});
            })
            .catch((error) => console.log(error));
    };

    const hideComments = (id) => {
        setCommetnsVisible({...commetnsVisible, [id]: false});
    };

    return (
        <div className="wrapper">
            <button onClick={() => getPosts()}>Загрузить посты</button>
            <div className="items">
                {posts.map((post) => (
                    <div key={post.id} className="item">
                        <p
                            style={{
                                background: commetnsVisible[post.id] ? "hsl(208, 51%, 62%)" : "",
                            }}
                            onClick={() => (commetnsVisible[post.id] ? hideComments(post.id) : getPostId(post.id))}
                        >
                            {post.title}
                        </p>
                        {commetnsVisible[post.id] && (
                            <>
                                {arrComments[post.id]?.map((item) => (
                                    <div key={item.id} className="comments">
                                        <p>comment: {item.body}</p>
                                        <p>email: {item.email}</p>
                                        <p>name: {item.name}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
