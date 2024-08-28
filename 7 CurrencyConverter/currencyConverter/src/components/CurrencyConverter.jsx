import { useEffect } from "react";
import { useState } from "react";
import useFetchExchangeRate from "../hooks/useFetchExchangeRate";
import "./currencyConverter.css";
export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies] = useState(["USD", "EUR", "GBP", "INR"]);
  const { data, loading, fetching } = useFetchExchangeRate({
    url: `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
  });

  useEffect(() => {
    fetching();
  }, [fromCurrency, fetching]);

  useEffect(() => {
    const rate = data?.rates[toCurrency];
    console.log(rate);
    setConvertedAmount(amount * rate);
  }, [data, amount, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      {loading ? (
        <p className="loading">Loading Currency Pairs...</p>
      ) : (
        <>
          <div className="input-container">
            <input
              type="number"
              name="fromCurrency"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option className="option" key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <input type="number" value={convertedAmount.toFixed(2)} readOnly />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option className="option" key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <p>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
          <button onClick={() => fetching()}>Update Rates</button>
        </>
      )}
    </div>
  );
}
