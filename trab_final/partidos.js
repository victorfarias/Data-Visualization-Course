

		$(function () {
    		$('#partidos').highcharts({
       		    chart: {
                        type: 'column'
                },
                title: {
                    text: 'Votos por partido'
        },
        xAxis: {
            categories: ['PSDB', 'DEM', 'PRB', 'SD', 'PSC', 'PPS', 'PV', 'PSL', 'PMB', 'PMDB', 'PP', 'PSD', 'PSB', 'PR', 'PTB', 'PTN', 'PDT', 'PHS', 'PROS', 'PTdoB', 'REDE', 'PEN', 'PT', 'PCdoB', 'PSOL']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Número de Votos'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Sim',
            data: [52, 28, 22, 14, 10, 8, 6, 3, 1, 58, 38, 30, 29, 25, 14, 8, 6, 6, 4, 2, 2, 1, 0, 0, 0]
        }, {
            name: 'Não',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 4, 8, 3, 10, 6, 4, 12, 1, 2, 1, 2, 1, 60, 10, 6]
        }, {
            name: 'Ausente',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
            name: 'Abstenção',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ]
        	}]
    	});
		});

