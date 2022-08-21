import Head from "next/head";

export async function getServerSideProps(context) {
  console.log(context);
  // fetching data
  const fetching = await fetch("http://jsonplaceholder.typicode.com/posts");
  const data = await fetching.json();
  return {
    props: { data },
  };
}

const Crud = (props) => {
  // console.logs(props);
  const { data } = props;
  return (
    <>
      <Head>
        <title>Halaman CRUD</title>
        <link rel="icon" href="/favicon.ico" content="halaman CRUD" />
      </Head>
      <div>
        <h2>Halaman CRUD</h2>
        {/* looping */}
        {data.map((item) => {
          return <p>{item.body}</p>;
        })}
      </div>
    </>
  );
};

export default Crud;
