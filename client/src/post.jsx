import React from "react";
import { useState } from "react";
import axios from "axios";



export default () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:1000/posts", {
            title
        });
        setTitle("");
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-8    ">
                <form
                    onSubmit={onSubmit}
                    className="p-4 border rounded shadow-sm bg-light">

                    <div className="form-group mb-3">
                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            placeholder="Enter title"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

