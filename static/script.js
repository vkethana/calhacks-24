$(document).ready(function() {
    $('#submit').click(function() {
        const tradingDate = $('#trading_date').val();
        const evaluationDate = $('#evaluation_date').val();

        // Clear previous results
        $('#trades-list').empty();
        $('#headlines').empty();
        $('#pnl-result').empty();

        // Fetch the news for the selected trading date
        $.ajax({
            url: '/api/get_news',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                trading_date: tradingDate
            }),
            success: function(newsResponse) {
                // Display headlines
                if (newsResponse.length > 0) {
                    newsResponse.forEach(headline => {
                        $('#headlines').append(`<p>${headline}</p>`);
                    });
                } else {
                    $('#headlines').append('<p>No headlines found.</p>');
                }

                // After getting the news, fetch trades and PnL
                getTradesAndPnL(tradingDate, evaluationDate);
            },
            error: function(xhr) {
                const errorMsg = xhr.responseJSON ? xhr.responseJSON.error : 'An error occurred while fetching news.';
                alert(`Error: ${errorMsg}`);
            }
        });
    });

    // Function to get trades and PnL
    function getTradesAndPnL(tradingDate, evaluationDate) {
        $.ajax({
            url: '/api/get_trades_and_pnl',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                trading_date: tradingDate,
                evaluation_date: evaluationDate
            }),
            success: function(response) {
                // Display trades
                const trades = response.trades.trades;
                if (trades && trades.length > 0) {
                    trades.forEach(trade => {
                        $('#trades-list').append(`<p>${trade.timestamp} - ${trade.action} ${trade.volume} shares of ${trade.ticker}</p>`);
                    });
                } else {
                    $('#trades-list').append('<p>No trades generated.</p>');
                }

                // Display PnL
                const pnl = response.result;
                $('#pnl-result').append(`<p>Total PnL: ${pnl.toFixed(2)}</p>`);
            },
            error: function(xhr) {
                const errorMsg = xhr.responseJSON ? xhr.responseJSON.error : 'An error occurred while fetching trades and PnL.';
                alert(`Error: ${errorMsg}`);
            }
        });
    }
});
