import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import Header from "../Header";
import Posts from "../Posts";
import "./App.scss";

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return auth.onAuthStateChanged((authUser) => {
            authUser ? setUser(authUser) : setUser(null);
        });
    }, []);

    return (
        <div className="App">
            <Header user={user} />
            <Posts />
        </div>
    );
}
