import react, { useState, useEffect } from "react";
import axios from "axios";

export default ({comments}) => {
    const renderedComments = comments.map((comment) => {
        let content;

        if(comment.status === "approved"){
            content = comment.content;
        }

        if(comment.status === "rejected"){
            content = "This comment is rejected";
        }

        if(comment.status === "pending"){
            content = "This comment is waiting for moderation";
        }

        return (
            <li style={{ "margin": "0px 0px 0px 30px " }} key={comment.id}>{content}</li>
        );
    })

    return (
        <div >
            {renderedComments}
        </div>
    );
};