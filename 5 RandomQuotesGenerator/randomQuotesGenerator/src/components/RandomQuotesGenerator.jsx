import useFetch from "../hooks/useFetch";
export default function RandomQuotesGenerator({ url }) {
  const { fetchQuotes, isLoading, response } = useFetch({ url });
  const handleRefresh = async () => {
    await fetchQuotes();
  };
  return (
    <>
      <h1>Random Quotes Generator</h1>
      {isLoading ? (
        <h1>waiting for qoutes</h1>
      ) : (
        <div className="quotesRapper">
          <h1>Qoutes is</h1>
          <p>{response?.message.author}</p>
          <p>{response?.message.content}</p>
        </div>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
}
