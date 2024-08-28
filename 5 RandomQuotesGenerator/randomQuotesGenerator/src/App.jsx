import "./App.css";
import RandomQuotesGenerator from "./components/RandomQuotesGenerator";

function App() {
  return (
    <>
      <RandomQuotesGenerator url={"https://api.quotable.io/random"} />
    </>
  );
}

export default App;
