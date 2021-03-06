import React, { useState } from "react";
import { auth } from "../../firebase";
import { Button } from "@material-ui/core";
import SignUpModal from "../SignUpModal";
import SignInModal from "../SignInModal";
import AddPostModal from "../AddPostModal";
import "./Header.scss";

export default function Header({ user }) {
    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const openSignUpModal = () => setSignUpModalOpen(true);
    const closeSignUpModal = () => setSignUpModalOpen(false);

    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const openSignInModal = () => setSignInModalOpen(true);
    const closeSignInModal = () => setSignInModalOpen(false);

    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const openAddPostModal = () => setAddPostModalOpen(true);
    const closeAddPostModal = () => setAddPostModalOpen(false);

    const signOut = () => auth.signOut();

    return (
        <div className="Header">
            <img
                className="HeaderImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram logo"
            />
            {user ? (
                <>
                    <Button onClick={openAddPostModal} color="secondary">
                        Add post
                    </Button>
                    <Button onClick={signOut} color="secondary">
                        Sign out
                    </Button>
                    <AddPostModal
                        userName={user.displayName}
                        addPostModalOpen={addPostModalOpen}
                        closeAddPostModal={closeAddPostModal}
                    />
                </>
            ) : (
                <span>
                    <Button onClick={openSignUpModal} color="secondary">
                        Sign up
                    </Button>
                    <Button onClick={openSignInModal} color="secondary">
                        Sign in
                    </Button>
                    <SignUpModal
                        signUpModalOpen={signUpModalOpen}
                        closeSignUpModal={closeSignUpModal}
                    />
                    <SignInModal
                        signInModalOpen={signInModalOpen}
                        closeSignInModal={closeSignInModal}
                    />
                </span>
            )}
        </div>
    );
}
