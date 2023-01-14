// const getData = async (slug) => {
//   const data = await getDataFromCMS(slug);
//   return data;
// };

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });

export default async function BlogPost({ params }) {
  const temp = await delay(5000);
  console.log(params);
  // const post = await getData();
  return <div>blog post</div>;
}
