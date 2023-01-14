"use client"; // the Error Object is inside the browser ?

export default function ErrorHome({ error }) {
  return <div>ops! {error.message}</div>;
}
