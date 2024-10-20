function sendDate() {
    const dateSlider = document.getElementById('date-slider');
    const selectedDate = dateSlider.value;

    const tickerInput = document.getElementById('ticker-input');
    const ticker = tickerInput.value;

    // Send the selected date and ticker to the backend
    fetch('/api/get_value', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_date: selectedDate, ticker: ticker }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = data.result;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
