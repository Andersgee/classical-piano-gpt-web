import { Samples } from "./Samples";

export default function Home() {
  return (
    <div className="px-4 pt-4 pb-12 flex flex-col items-center">
      <main className="">
        <article>
          <h1 className="text-4xl mt-10 text-black tracking-tighter text-center">
            Classical Piano GPT
          </h1>
          <p>
            This is a gpt style neural net trained on classical piano music. You
            can listen to some samples of the music it can generate here.
          </p>
          <Samples />

          <h2 className="text-xl tracking-tight">About this project</h2>
          <p>Here is a simplified summary of how this project was done.</p>
          <p>
            First off, we need a music dataset. Midi files are lightweight and
            easy to work with. I found a{" "}
            <a href="http://www.piano-midi.de/" target="_blank">
              website
            </a>{" "}
            where a kind german hosts a bunch of them. I parsed those midi files
            into sequences of notes and produced a dataset.
          </p>
          <p>
            A useful preprocessing step before training the model is tokenizing
            the dataset. Not only does it compress the data but it makes the
            data easier to learn. The legend Andrej Karpathy has a nice youtube{" "}
            <a
              href="https://www.youtube.com/watch?v=zduSFxRajkE"
              target="_blank"
            >
              video
            </a>{" "}
            explaining it well.
          </p>
          <p>
            Now we are ready to build and train the model. Current state of the
            art for training/modeling sequences is still the Transformer{" "}
            architecture introduced in the landmark paper from 2017:{" "}
            <a href="https://arxiv.org/abs/1706.03762" target="_blank">
              Attention is all you need
            </a>{" "}
            but with some improvements over the years.
          </p>
          <p>
            Anyway, this is what chat-GPT uses, and it is open source so anyone
            can look at the code. So I did that: adapted it to my use case,
            trained a model and generated some samples.
          </p>
          <p>
            The last step was building a website and using{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
              target="_blank"
            >
              Web Audio Api
            </a>{" "}
            to play those samples. The generated music is incredibly lightweight
            in size: Around 0.001 MB per minute of music. They are fetched,
            unpacked and then played on each button click.
          </p>
          <p>
            You can find some of my other project at{" "}
            <a href="https://www.andyfx.net">andyfx.net</a>
          </p>
        </article>
      </main>
    </div>
  );
}
