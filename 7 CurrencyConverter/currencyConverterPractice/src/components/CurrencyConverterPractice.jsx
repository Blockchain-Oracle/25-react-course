import { useState, useEffect } from "react";
import useFetchExchangeRatePractice from "../hooks/useFetchExchangeRatePractice";
import "./currencyConverterPractice.css";
import { useMemo } from "react";

const CurrencySelect = ({ currencies, selectedCurrency, onChange }) => (
  <div className="select-currencyPair">
    <select value={selectedCurrency} onChange={onChange}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
);

export default function CurrencyConverterPractice() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState("");
  const [toCurrency, setToCurrency] = useState("INR");
  const [toAmount, setToAmount] = useState(0);
  const [currencies] = useState(["USD", "EUR", "GBP", "INR"]);
  const { data, fetching, loading } = useFetchExchangeRatePractice();
  const url = useMemo(
    () => `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
    [fromCurrency]
  );
  useEffect(() => {
    fetching(url);
    console.log(fromCurrency);
  }, [fetching, fromCurrency, url]);

  useEffect(() => {
    if (data && data.rates) {
      const rate = data.rates[toCurrency];
      setToAmount(fromAmount * rate);
    }
  }, [data, fromAmount, toCurrency]);

  const handleFromAmountChange = (e) => {
    setFromAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="currencyConverter-container">
      <h2>Anime Currency Converter</h2>
      {loading ? (
        <p>Loading currency exchange rates...</p>
      ) : (
        <>
          <div className="fromCurrency-container">
            <input
              type="number"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="Enter amount"
            />
            <CurrencySelect
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onChange={handleFromCurrencyChange}
            />
          </div>
          <div className="to-text">
            <p>To</p>
          </div>
          <div className="toCurrency-container">
            <input type="number" value={toAmount.toFixed(2)} readOnly />
            <CurrencySelect
              currencies={currencies}
              selectedCurrency={toCurrency}
              onChange={handleToCurrencyChange}
            />
          </div>
          <p>
            {fromAmount} of {fromCurrency} = {toAmount.toFixed(2)} of{" "}
            {toCurrency}
          </p>
          <button onClick={() => fetching(url)}>Update Rates</button>
        </>
      )}
    </div>
  );
}
