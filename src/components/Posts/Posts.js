import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import Post from "../Post";
import "./Posts.scss";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        return db
            .collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div className="Posts">
            {posts.map(({ id, post }) => (
                <Post
                    key={id}
                    userName={post.userName}
                    userCaption={post.userCaption}
                    imageURL={post.imageURL}
                    timestamp={post.timestamp}
                />
            ))}
        </div>
    );
}
