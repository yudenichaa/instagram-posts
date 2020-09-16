import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { Button } from "@material-ui/core";
import SignUpModal from "../SignUpModal";
import SignInModal from "../SignInModal";
import "./Header.scss";

export default function Header() {
    const [user, setUser] = useState(null);

    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const openSignUpModal = () => setSignUpModalOpen(true);
    const closeSignUpModal = () => setSignUpModalOpen(false);

    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const openSignInModal = () => setSignInModalOpen(true);
    const closeSignInModal = () => setSignInModalOpen(false);

    const signOut = () => auth.signOut();

    useEffect(() => {
        return auth.onAuthStateChanged((authUser) => {
            authUser ? setUser(authUser) : setUser(null);
        });
    }, []);

    return (
        <div className="Header">
            <img
                className="HeaderImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram logo"
            />
            {user ? (
                <Button onClick={signOut} color="secondary">
                    Sign out
                </Button>
            ) : (
                <span>
                    <Button onClick={openSignUpModal} color="secondary">
                        Sign up
                    </Button>
                    <Button onClick={openSignInModal} color="secondary">
                        Sign in
                    </Button>
                </span>
            )}
            <SignUpModal
                signUpModalOpen={signUpModalOpen}
                closeSignUpModal={closeSignUpModal}
            />
            <SignInModal
                signInModalOpen={signInModalOpen}
                closeSignInModal={closeSignInModal}
            />
        </div>
    );
}
