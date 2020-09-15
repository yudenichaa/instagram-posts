import React from "react";
import "./App.scss";
import Post from "../Post";

export default function App() {
    return (
        <div className="App">
            <div className="App-Header">
                <img
                    className="App-HeaderImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Instagram logo"
                />
            </div>
            <div className="App-Posts">
                <Post
                    userName="username"
                    userCaption="usercaption"
                    imageURL="https://picsum.photos/536/354"
                />
                <Post
                    userName="username"
                    userCaption="usercaption"
                    imageURL="https://picsum.photos/536/354"
                />
                <Post
                    userName="username"
                    userCaption="usercaption"
                    imageURL="https://picsum.photos/536/354"
                />
            </div>
        </div>
    );
}
