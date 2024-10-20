import axios from "axios";

export default function formatToUSCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export const getMonthAndDay = (dayOfYear: number) => {
  const months = [
    { month: "01", days: 31 },
    { month: "02", days: 28 }, // Ignoring leap years for simplicity
    { month: "03", days: 31 },
    { month: "04", days: 30 },
    { month: "05", days: 31 },
    { month: "06", days: 30 },
    { month: "07", days: 31 },
    { month: "08", days: 31 },
    { month: "09", days: 30 },
    { month: "10", days: 31 },
    { month: "11", days: 30 },
    { month: "12", days: 31 },
  ];

  let day = dayOfYear + 1; // Ensure the first day starts at 1, not 0
  let month = "";

  for (let i = 0; i < months.length; i++) {
    if (day <= months[i].days) {
      month = months[i].month;
      break;
    } else {
      day -= months[i].days;
    }
  }

  return { month, day };
};

export async function fetchApiTrades(date: string, evalDate: string) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/get_trades_and_pnl",
      {
        trading_date: date,
        evaluation_date: evalDate,
      }
    );
    return response.data; // Store the response data in state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchApiHeadlines(date: string) {
  try {
    const response = await axios.post("http://localhost:5000/api/get_news", {
      trading_date: date,
    });
    return response.data; // Store the response data in state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
