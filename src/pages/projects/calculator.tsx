import Head from "next/head";

export default function Calculator() {
  return (
    <>
      <Head>
        <title>Calculator — Jimwel Cruz</title>
        <meta
          name="description"
          content="A modern and responsive calculator app by Jimwel Cruz."
        />
      </Head>
      <main className="h-screen w-full bg-background">
        <iframe
          src="/projects/calculator/index.html"
          title="Calculator"
          className="h-full w-full border-0"
        />
      </main>
    </>
  );
}
