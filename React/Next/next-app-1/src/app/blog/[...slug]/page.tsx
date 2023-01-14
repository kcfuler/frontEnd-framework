import { delay } from "@/app/lib/delay";

export default async function BlogPost({ params }) {
  await delay(5000);
  console.log(params);
  // const post = await getData();
  return <div>blog post</div>;
}
