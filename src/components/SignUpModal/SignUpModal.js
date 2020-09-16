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
import "./SignUpModal.scss";

const useStyles = makeStyles(() => ({
    AppSignUpInput: {
        width: "100%",
        marginTop: "0.8rem",
    },
    AppSignUpButton: {
        marginTop: "0.8rem",
    },
}));

export default function SignUpModal({ signUpModalOpen, closeSignUpModal }) {
    const classes = useStyles();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const onUserNameChange = (event) => setUserName(event.target.value);
    const onUserEmailChange = (event) => setUserEmail(event.target.value);
    const onUserPasswordChange = (event) => setUserPassword(event.target.value);

    const onSignUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(userEmail, userPassword)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: userName,
                });
            })
            .then(closeSignUpModal)
            .catch((error) => alert(error.message));
    };
    return (
        <Modal
            open={signUpModalOpen}
            onClose={closeSignUpModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={signUpModalOpen}>
                <form onSubmit={onSignUp} className="SignUpModal">
                    <img
                        className="SignUpModal-Image"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="Instagram logo"
                    />
                    <Input
                        className={classes.AppSignUpInput}
                        type="text"
                        placeholder="Name"
                        value={userName}
                        onChange={onUserNameChange}
                        autoFocus
                    />
                    <Input
                        className={classes.AppSignUpInput}
                        type="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={onUserEmailChange}
                    />
                    <Input
                        className={classes.AppSignUpInput}
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={onUserPasswordChange}
                    />
                    <Button
                        type="submit"
                        className={classes.AppSignUpButton}
                        onClick={onSignUp}
                        color="secondary"
                    >
                        Sign up
                    </Button>
                </form>
            </Fade>
        </Modal>
    );
}
