import React from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core/";
import AddPostForm from "../AddPostForm";
import "./AddPostModal.scss";

export default function AddPostModal({
    userName,
    addPostModalOpen,
    closeAddPostModal,
}) {
    return (
        <Modal
            open={addPostModalOpen}
            onClose={closeAddPostModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={addPostModalOpen}>
                <div className="AddPostModal-FormContainer">
                    <AddPostForm
                        userName={userName}
                        onPostAdded={closeAddPostModal}
                    />
                </div>
            </Fade>
        </Modal>
    );
}
