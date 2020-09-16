import React from "react";
import "./Post.scss";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(() => ({
    PostAvatar: {
        backgroundColor: "#E1306C",
        marginRight: "0.5rem",
    },
}));

export default function Post({ userName, userCaption, imageURL, timestamp }) {
    const classes = useStyles();
    const postDate = timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "";
    console.log(timestamp);
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
        </div>
    );
}
