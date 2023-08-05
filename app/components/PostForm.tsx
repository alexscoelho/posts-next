"use client";

import React, { useState } from "react";
import { useSWRConfig } from "swr";

export const PostForm = () => {
  const { mutate } = useSWRConfig();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("http://localhost:3001/posts", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
    })
      .then((resp) => mutate("/posts"))
      .catch((e) => console.error(e));
  };
  return (
    <form
      className="flex flex-col w-fit gap-3 my-2 text-black"
      onSubmit={handleSubmit}
    >
      <span className="flex gap-2">
        <label>Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </span>
      <span className="flex gap-2">
        <label>Body</label>
        <textarea onChange={(e) => setBody(e.target.value)} />
      </span>
      <button className="bg-sky-600 rounded-md py-2 px-3" type="submit">
        Post
      </button>
    </form>
  );
};
