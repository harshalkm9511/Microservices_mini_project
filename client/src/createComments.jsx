import react, { useState, useEffect } from "react";
import axios from "axios";

export default ({postId}) => {
    const [content, setContent] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:1001/posts/${postId}/comments`, {
            content
        });
        setContent("");
    }

    return (
        <div >
            <form
                className="  justify-items-center"
                onSubmit={onSubmit}
            >
                <div>
                    <input
                        value={content}
                        onChange={(e) => { setContent(e.target.value) }}
                        className="form-control"
                    />
                </div>
                <button style={{ "margin": "10px 0px " }} className="btn btn-dark">Submit</button>
            </form>
        </div>
    );
}