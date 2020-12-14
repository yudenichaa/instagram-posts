import React, { useState, useEffect } from "react";
import "./Post.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, InputBase } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { db } from "../../firebase";
import firebase from "firebase/app";

const useStyles = makeStyles(() => ({
    PostAvatar: {
        backgroundColor: "#E1306C",
        marginRight: "0.5rem",
    },
    PostCommentInput: {
        flexGrow: 1,
        borderRight: "0.05rem solid lightgrey",
        paddingLeft: "0.5rem",
    },
}));

export default function Post({
    postID,
    user,
    userName,
    userCaption,
    imageURL,
    timestamp,
}) {
    const classes = useStyles();

    const [postComments, setPostComments] = useState([]);
    const [postComment, setPostComment] = useState("");

    const onPostCommentChange = (event) => setPostComment(event.target.value);

    useEffect(() => {
        return db
            .collection("posts")
            .doc(postID)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPostComments(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        comment: doc.data(),
                    }))
                );
            });
    }, []);

    const postDate = timestamp
        ? new Date(timestamp.seconds * 1000).toLocaleString()
        : "";

    const onAddComment = (event) => {
        event.preventDefault();
        db.collection("posts")
            .doc(postID)
            .collection("comments")
            .add({
                text: postComment,
                userName: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => setPostComment(""))
            .catch((error) => alert(error.message));
    };

    return (
        <div className="Post">
            <div className="Post-Header">
                <div className="Post-AvatarContainer">
                    <Avatar className={classes.PostAvatar} alt={userName}>
                        <AccountCircleIcon />
                    </Avatar>
                    <h3>{userName}</h3>
                </div>
                <h4>{postDate}</h4>
            </div>
            <img src={imageURL} alt="Post image" className="Post-Image" />
            <h4 className="Post-Caption">
                <span className="Post-CaptionUser">{userName}:</span>{" "}
                {userCaption}
            </h4>
            <div className="Post-Comments">
                {postComments.map(({ id, comment }) => {
                    const commentDate = comment.timestamp
                        ? new Date(
                              comment.timestamp.seconds * 1000
                          ).toLocaleString()
                        : "";
                    return (
                        <div className="Post-Comment" key={id}>
                            <div className="Post-CommentDate">{commentDate}</div>{" "}
                            <span className="Post-CommentUser">
                                {comment.userName}:
                            </span>{" "}
                            {comment.text}
                        </div>
                    );
                })}
            </div>
            {user && (
                <form className="Post-CommentForm" onSubmit={onAddComment}>
                    <InputBase
                        className={classes.PostCommentInput}
                        value={postComment}
                        onChange={onPostCommentChange}
                        placeholder="Comment"
                    />
                    <Button
                        disabled={!postComment}
                        type="submit"
                        onClick={onAddComment}
                        color="secondary"
                    >
                        Add comment
                    </Button>
                </form>
            )}
        </div>
    );
}
