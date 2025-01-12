import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  // State to store currency exchange rates
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch exchange rate data for the given currency
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json()) // Parse the response as JSON
      .then((res) => setData(res[currency])); // Update state with the exchange rates
  }, [currency]); // Effect runs whenever the "currency" dependency changes

  // Return the fetched exchange rate data
  return data;
}

export default useCurrencyInfo;
