import useSWR from "swr";
import { Posts } from "../components/Posts";
import { PostForm } from "../components/PostForm";
import Link from "next/link";

export default function PostsPage() {
  return (
    <main className="m-10">
      <h1 className=" flex text-4xl justify-center">Posts</h1>
      <PostForm />
      <Posts />
    </main>
  );
}
