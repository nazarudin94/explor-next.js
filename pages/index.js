import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Halaman Index</title>
        <link rel="icon" href="/favicon.ico" content="Halaman about" />
      </Head>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl">Selamat datang di Explore NextJs</h1>
      </div>
    </div>
  );
}
