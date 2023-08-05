"use client";

import React from "react";
import useSWR, { Fetcher } from "swr";
import { Post } from "../Types";
import Link from "next/link";

const fetcher: Fetcher<Post[]> = () => {
  return fetch("http://localhost:3001/posts").then((r) => {
    if (!r.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return r.json();
  });
};

export const Posts = () => {
  const { data, error, isLoading, mutate } = useSWR("/posts", fetcher);

  if (error) return <div className="text-red-600">failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data?.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <li className="list-disc">
            <h2 className="text-xl text-sky-600">{post.title}</h2>
            <p className="text-slate-400 mx-6">{post.body}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};
