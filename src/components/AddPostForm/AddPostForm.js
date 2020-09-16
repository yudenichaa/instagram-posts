import React, { useState } from "react";
import { Input, Button, LinearProgress, makeStyles } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import firebase from "firebase";
import { storage, db } from "../../firebase";
import "./AddPostForm.scss";

const useStyles = makeStyles(() => ({
    FormInput: {
        marginTop: "1rem",
        width: "100%",
    },
    DropZone: {
        width: "100%",
        minHeight: "20rem",
        marginTop: "1rem",
    },
    DropZoneGridItem: {
        minWidth: "100%",
        maxWidth: "30rem",
        "& img": {
            height: "auto",
            maxWidth: "95%",
            maxHeight: "90%",
            objectFit: "contain",
        },
    },
    DropzoneParagraph: {
        fontSize: "1.2em",
        margin: "1rem auto 0.5rem auto",
    },
    FormLinearProgress: {
        marginTop: "1rem",
        width: "100%",
    },
    FormButton: {
        marginTop: "1rem",
    },
}));

export default function AddPostForm({ userName, onPostAdded }) {
    const classes = useStyles();

    const [postCaption, setPostCaption] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postImageLoadingProgress, setPostImageLoadingProgress] = useState(0);

    const onPostCaptionChange = (event) => setPostCaption(event.target.value);
    const onPostImageChange = (files) => setPostImage(files[0]);

    const onAddPost = (event) => {
        event.preventDefault();
        if (!postCaption || !postImage) {
            alert("Enter caption and select image");
            return;
        }
        const uploadTask = storage
            .ref(`images/${postImage.name}`)
            .put(postImage);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPostImageLoadingProgress(progress);
            },
            (error) => {
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(postImage.name)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("posts")
                            .add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                userCaption: postCaption,
                                imageURL: url,
                                userName: userName,
                            })
                            .then(onPostAdded);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        );
    };

    return (
        <form className="AddPostForm" onSubmit={onAddPost}>
            <h2>Add new post</h2>
            <Input
                className={classes.FormInput}
                type="text"
                placeholder="Post caption"
                value={postCaption}
                onChange={onPostCaptionChange}
            />
            <DropzoneArea
                dropzoneClass={classes.DropZone}
                filesLimit={1}
                dropzoneParagraphClass={classes.DropzoneParagraph}
                acceptedFiles={["image/*"]}
                showAlerts={false}
                showFileNames={true}
                previewGridProps={{
                    container: {
                        justify: "center",
                    },
                }}
                previewGridClasses={{
                    item: classes.DropZoneGridItem,
                }}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={onPostImageChange}
            />
            <LinearProgress
                className={classes.FormLinearProgress}
                variant="determinate"
                value={postImageLoadingProgress}
            />
            <Button
                type="submit"
                className={classes.FormButton}
                onClick={onAddPost}
                color="secondary"
            >
                Add post
            </Button>
        </form>
    );
}
