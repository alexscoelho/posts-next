"use client";

import React from "react";
import useSWR, { Fetcher } from "swr";
import { Post } from "../Types";
import Link from "next/link";
import { useParams } from "next/navigation";

const fetcher: Fetcher<Post> = (id: string) => {
  return fetch(`http://localhost:3001/posts/${id}`).then((r) => {
    if (!r.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return r.json();
  });
};

export const PostDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(id, fetcher);

  if (error) return <div className="text-red-600">failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="m-7">
      <h1 className="text-2xl text-sky-600">{data?.title}</h1>
      <p>{data?.body}</p>
    </main>
  );
};
