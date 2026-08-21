import Head from "next/head";

export default function MoleBash() {
  return (
    <>
      <Head>
        <title>Mole Bash — Jimwel Cruz</title>
        <meta
          name="description"
          content="Mole Bash — a classic arcade-style whack-a-mole game by Jimwel Cruz."
        />
      </Head>
      <main className="h-screen w-full bg-background">
        <iframe
          src="/projects/mole-bash/index.html"
          title="Mole Bash"
          className="h-full w-full border-0"
        />
      </main>
    </>
  );
}
