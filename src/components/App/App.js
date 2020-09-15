import React, { useState, useEffect } from "react";
import "./App.scss";
import Post from "../Post";
import { db, auth } from "../../firebase";
import SignInModal from "../SignInModal";
import Button from "@material-ui/core/Button";

export default function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        return db.collection("posts").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data(),
                }))
            );
        });
    }, []);

    const [signInModalOpen, setSignInModalOpen] = useState(false);

    const onSignInModalOpen = () => {
        setSignInModalOpen(true);
    };

    const onSignInModalClose = () => {
        setSignInModalOpen(false);
    };

    const onSignIn = (userName, userEmail, userPassword) => {
        alert(userName, userEmail, userPassword);
    };

    return (
        <div className="App">
            <div className="App-Header">
                <img
                    className="App-HeaderImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Instagram logo"
                />
                <Button onClick={onSignInModalOpen} color="secondary">
                    Sign in
                </Button>
                <SignInModal
                    signInModalOpen={signInModalOpen}
                    onSignInModalClose={onSignInModalClose}
                    handleSignIn={onSignIn}
                />
            </div>
            <div className="App-Posts">
                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        userName={post.userName}
                        userCaption={post.userCaption}
                        imageURL={post.imageURL}
                    />
                ))}
            </div>
        </div>
    );
}
