const getData = async (slug) => {
  const data = await getDataFromCMS(slug);
  return data;
};

export default async function BlogPost({ params }) {
  console.log(params);
  // const post = await getData();
  return <div>blog post</div>;
}
