function createPieChart(canvas, data, legend, customLegendCallback) {
    var myPieChart = new Chart($(canvas),{
        type: 'pie',
        data: data,
        options: {
            legendCallback: customLegendCallback,
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
        }
    });
    $(legend).html(myPieChart.generateLegend());
}

function createWeekActivityChart() {
    var custom_callback = function(chart) {
        var text = [];
        text.push('<ul style="font-size: 20px; list-style: none;">');
        text.push('<li style="font-weight: bold;"> Week activity </li>');
        for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
            text.push('<li>');
            text.push('<span style="width: 15px; height: 15px; border-radius: 50%; display: inline-block; background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span> ');

            if (chart.data.labels[i]) {
                text.push(chart.data.labels[i] + ': ');
                text.push(chart.data.datasets[0].data[i] + '%');
            }
            text.push('</li>');
        }
        text.push('</ul>');
        return text.join("");
    }

    byDaysOfWeek = recordList.splitByDaysOfWeek();
    total = recordList.getTotal();
    for (var i = 0; i < byDaysOfWeek.length; i++) {
        if (byDaysOfWeek[i] != 0) {
            byDaysOfWeek[i] = parseInt(byDaysOfWeek[i] / total  * 100);
        }
    }

    //Move Sunday to the end of the list
    byDaysOfWeek.push(byDaysOfWeek.shift());

    data = {
        datasets: [{
            data: byDaysOfWeek,
            backgroundColor: ['red', 'green', 'blue', 'yellow', 'silver', 'purple', 'lime'],
        }],
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ]
    };

    createPieChart('#chart', data, '#legend', custom_callback);
}

createWeekActivityChart();