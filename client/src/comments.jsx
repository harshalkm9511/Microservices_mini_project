import react, { useState, useEffect } from "react";
import axios from "axios";

export default ({comments}) => {
    const renderedComments = comments.map((comment) => {
        return (
            <li style={{ "margin": "0px 0px 0px 30px " }} key={comment.id}>{comment.content}</li>
        );
    })

    return (
        <div >
            {renderedComments}
        </div>
    );
};