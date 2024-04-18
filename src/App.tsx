import React from "react"
import "./components/Header.css"
import "./components/Input.css"
import axios from "axios"
import './App.css'
import { useState } from "react";

interface WordDefinition {
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio?: string;
  }[];
  origin: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}
function App() {
  const [completeWords, setCompleteWords] = useState<WordDefinition | null>(null)
  const [word, setWord] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dictAPI = async () => {
      try {
        const data = await axios.get<WordDefinition[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        setCompleteWords(data.data[0]);
        console.log(data);

      } catch (error) {
        console.log(error, "fetching data failed.");

      }
    };

    await dictAPI();
    setWord("")
  };

  console.log(word)

  return (
    <>
      <section className="max-w-2xl mx-auto p-5">
        <h1 className="text-3xl text-slate-800 font-bold mb-8 text-center">
          Dictionary Lite&#8482;
        </h1>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for the definition of a word"
            required
            className="py-2 px-4 border-b-2 border-blue-400 outline-none focus:border-blue-600 transition w-full text-xl lg:text-2xl"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white text-xl lg:text-2xl py-2 px-4 rounded shadow mt-4 hover:bg-blue-800 transition-all duration-200"
          >
            Look for a Definition
          </button>
        </form>

        {completeWords && (
          <div className="mt-20">
            <h2 className="capitalize text-slate-700 font-bold text-5xl">
              {completeWords.word}{" "}
              <span className="text-xl text-slate-500 inline-block ml-4">
                {completeWords.phonetic}
              </span>
            </h2>

            <ul className="mt-8 flex flex-col gap-4">
              {completeWords.phonetics.map((phonetic, index) => (
                <React.Fragment key={index}>
                  <li className="font-bold text-xl text-slate-500">
                    {phonetic.text}
                  </li>
                  <audio controls>
                    <source src={phonetic.audio} />
                  </audio>
                </React.Fragment>
              ))}
            </ul>

            <ol className="my-10 flex flex-col">
              {completeWords.meanings.map((meaning, index) => (
                <div key={index} className="mt-8">
                  <li className=" bg-[#000] text-[#fff] rounded p-2 m-2 font-bold text-xl text-slate-500">
                    {meaning.partOfSpeech}
                  </li>

                  <>
                    {meaning.definitions.map((def, index) => (
                      <li
                        key={index}
                        className="text-xl lg:text-2xl mt-3"
                        style={{ color: "#333" }}
                      >
                        {def.definition}

                        {def.example && (
                          <small className="text-lg lg:text-xl block text-slate-400">
                            Example: {def.example}
                          </small>
                        )}
                      </li>
                    ))}
                  </>
                </div>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
}
export default App;