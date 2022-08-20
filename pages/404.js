import { useRouter } from "next/router";

const notfound = () => {
  const router = useRouter();
  return (
    <div>
      Oooops, Halaman tidak ditemukan.
      <br />
      Silahkan cek alamat yang anda masukan.
      <button onClick={() => router.push("/")}>Kembali</button>
    </div>
  );
};

export default notfound;
