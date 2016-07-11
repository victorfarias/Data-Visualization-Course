
    $(function () {
    $('#judicial').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Posicionamento dos deputados em relação ao governo'
        },
        xAxis: {
            categories: ['Votaram contra o Governo', 'Votaram a favor do Governo', 'Ausentes e Abstenções']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total de Deputados'
            }
        },
    
    
        legend: {
            reversed: true
        },
    tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total:           {point.stackTotal}'
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Deputados que possuem algum questionamento jurídico',
            data: [215,79,5]
        }, {
            name: 'Deputados que não possuem questionamento jurídico',
            data: [152,58,4]
        }]
    });
});

