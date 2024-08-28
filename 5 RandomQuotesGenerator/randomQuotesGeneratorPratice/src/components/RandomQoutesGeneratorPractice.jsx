import useFetch from "../../hooks/useFetch";
import "./randomQuotesPractice.css";
export default function RandomQoutesGeneratorPractice({ url }) {
  const { fetching, loading, response } = useFetch({ url });
  return (
    <div className="container">
      <h1>Random Quotes Generator</h1>
      <button onClick={async () => await fetching()}>Fetch</button>
      <div className="quotesWrapper">
        {loading && <p>Loading...</p>}
        {response && (
          <>
            <p className="quoteContent">{response?.message.content}</p>
            <p className="quoteAuthor">- {response?.message.author}</p>
          </>
        )}
      </div>
    </div>
  );
}
