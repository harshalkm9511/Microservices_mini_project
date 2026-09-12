import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateComment from "./createComments";
import Comments from "./comments";

export default () => {
    let [posts, setPosts] = useState({});

    const fetchUrl = async () => {
        let res = await axios.get("http://localhost:1000/posts");
        console.log(res.data);
        setPosts(res.data);
    };
    useEffect(() => {
        fetchUrl();
    }, []);

    const RenderPosts = Object.values(posts).map(post => {
        return (
            <div className="card"
                style={{ width: "20%", margin: "10px" }}
                key={post.id}
            >
                <div className="card-body">

                    <h2>{post.title}</h2>
                    <div >
                        <Comments postId={post.id} />
                        <h5 className="mt-2">New Comment</h5>
                        <CreateComment postId={post.id} />
                    </div>
                </div>
            </div>
        );
    })

    return (
        <div style={{ "margin": "0px 20px" }} className="d-flex justify-content-between flex-wrap flex-row  ">
            {RenderPosts}
        </div>
    );
};