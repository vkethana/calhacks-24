function sendDate() {
    const dateSlider = document.getElementById('date-slider');
    const selectedDate = dateSlider.value;

    fetch('/api/get_value', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_date: selectedDate }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = data.result;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
