import { useState } from "react";
import axios from "axios";

export default function App() {
  //use state to store input value
  const [input, setInput] = useState();
  const [meaning, setMeaning] = useState([]);
  //handling typing input; setting the value to input
  function handleChange(event) {
    setInput(event.target.value);
  }
  //handling on button click
  function handleClick(e) {
    e.preventDefault();
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      .then((res) => {
        // console.log(res.data);
        setMeaning(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const definitions = [];
  // iteratiing over response from api
  meaning.forEach((obj) => {
    obj.meanings.forEach((meaning) => {
      meaning.definitions.forEach((def) => {
        definitions.push(def.definition);
      });
    });
  });

  const card = definitions.map((item) => <p>{item}</p>);

  return (
    <div className="App">
      <form>
        <input type="text" onChange={handleChange} />
        <button onClick={handleClick}>Go</button>
        {card}
      </form>
    </div>
  );
}
