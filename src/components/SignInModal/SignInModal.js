import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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

export default function SignInModal({ signInModalOpen, onSignInModalClose, handleSignIn }) {
    const classes = useStyles();

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const onUserNameChange = (event) => setUserName(event.target.value);
    const onUserEmailChange = (event) => setUserEmail(event.target.value);
    const onUserPasswordChange = (event) => setUserPassword(event.target.value);

    const onSignIn = () => {
        handleSignIn(userName, userEmail, userPassword);
    };
    return (
        <Modal
            open={signInModalOpen}
            onClose={onSignInModalClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={signInModalOpen}>
                <div className="SignInModal">
                    <img
                        className="SignInModal-Image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="Instagram logo"
                    />
                    <Input
                        className={classes.AppSignInInput}
                        type="text"
                        placeholder="Name"
                        value={userName}
                        onChange={onUserNameChange}
                    />
                    <Input
                        className={classes.AppSignInInput}
                        type="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={onUserEmailChange}
                    />
                    <Input
                        className={classes.AppSignInInput}
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={onUserPasswordChange}
                    />
                    <Button
                        className={classes.AppSignInButton}
                        onClick={onSignIn}
                        color="secondary"
                    >
                        Sign in
                    </Button>
                </div>
            </Fade>
        </Modal>
    );
}
