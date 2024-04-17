import { Container } from "@mui/material";
import axios from "axios"
import './App.css'
import { useState, useEffect } from "react";
import Header from "./components/Header";

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
    <Container maxWidth="md">
      <h1 style={{ display: "block" }}>Dictionary</h1>
      <h2>{meaning?.word}</h2>
      <h3>{meaning?.phonetic}</h3>
      <p>{meaning?.origin}</p>
      <Header >

      </Header>
    </Container>
  )
}

export default App
