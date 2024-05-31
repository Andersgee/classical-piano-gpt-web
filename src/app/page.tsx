import { Samples } from "./Samples";

export default function Home() {
  return (
    <main className="flex justify-center mt-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl text-black tracking-tight">
          Classical Piano GPT
        </h1>
        <p className="mt-4 mb-6 text-neutral-800 text-balance">
          A gpt style neural net trained on classical piano music to generate
          music.
        </p>
        <Samples />
      </div>
    </main>
  );
}
