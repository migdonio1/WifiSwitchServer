$(function (info) {

    var data = [];

    for(var i = 0; i < info.length; i++){
        data.push([new Date(info[i].date).getTime(), info[i].value]);
    }
    // Create the chart

    Highcharts.stockChart('chart', {


        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            name: 'AAPL',
            data: data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});