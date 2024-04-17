import axios from "axios"
import './App.css'
import { useState, useEffect } from "react";

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
  const [meaning, setMeaning] = useState<WordDefinition | null>(null)

  const dictAPI = async () => {
    try {
      const data = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en_US/plane');
      setMeaning(data.data[0])
      console.log(data)

    } catch (error) {
      console.log(error)

    }
  }

  console.log(meaning)

  useEffect(() => {
    dictAPI()
  }, [])
  return (
    <div>
      <div><label><input type="text" placeholder="Search for a word." /></label></div>
      <h1 style={{ display: "block" }}>Dictionary</h1>

      <h2>{meaning?.word}</h2>
      <h3>{meaning?.phonetic}</h3>
      <p>{meaning?.origin}</p>
    </div>
  )
}

export default App
