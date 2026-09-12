import React from "react";
import ReactDom from "react-dom/client";
import Form from "./post";
import PostList from "./postList"


const App = () => {
    return <div>
        <Form />
        <hr />
        <h1>Post</h1>
        <PostList />
        <hr />
    </div>;
};

export default App;
