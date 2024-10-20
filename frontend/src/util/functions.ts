import axios from "axios";

export default function formatToUSCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export async function fetchApiTrades() {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/get_trades_and_pnl"
    );
    return response.data; // Store the response data in state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchApiHeadlines() {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/get_headlines"
    );
    return response.data; // Store the response data in state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
