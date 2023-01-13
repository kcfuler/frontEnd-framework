"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <div>contact</div>
      <Link href="/">home</Link>
      <Link href={`/blog/jock`}>blog</Link> |
      <button onClick={() => router.push("/")}> go home </button>
    </>
  );
}
