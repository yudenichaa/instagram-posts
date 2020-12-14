import React, { useState } from "react";
import {
    Modal,
    Button,
    Input,
    Backdrop,
    Fade,
    makeStyles,
} from "@material-ui/core/";
import { auth } from "../../firebase";
import "./SignInModal.scss";

const useStyles = makeStyles(() => ({
    AppSignInInput: {
        width: "100%",
        marginTop: "0.8rem",
    },
    AppSignInButton: {
        marginTop: "0.8rem",
    },
}));

export default function SignInModal({ signInModalOpen, closeSignInModal }) {
    const classes = useStyles();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const onUserEmailChange = (event) => setUserEmail(event.target.value);
    const onUserPasswordChange = (event) => setUserPassword(event.target.value);

    const onSignIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(userEmail, userPassword)
            .then(closeSignInModal)
            .catch((error) => alert(error.message));
    };
    return (
        <Modal
            open={signInModalOpen}
            onClose={closeSignInModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={signInModalOpen}>
                <form onSubmit={onSignIn} className="SignInModal">
                    <img
                        className="SignInModal-Image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="Instagram logo"
                    />
                    <Input
                        className={classes.AppSignInInput}
                        type="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={onUserEmailChange}
                        autoFocus
                    />
                    <Input
                        className={classes.AppSignInInput}
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={onUserPasswordChange}
                    />
                    <Button
                        type="submit"
                        className={classes.AppSignInButton}
                        onClick={onSignIn}
                        color="secondary"
                    >
                        Sign in
                    </Button>
                </form>
            </Fade>
        </Modal>
    );
}
