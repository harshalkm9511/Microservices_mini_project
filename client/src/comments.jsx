import react, { useState, useEffect } from "react";
import axios from "axios";

export default ({postId}) => {
    let [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:1001/posts/${postId}/comments`);
        setComments(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchComments();
        setComments([]);
    }, []);

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