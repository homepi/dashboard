<template>

    <div class="p-4">

        <Health />

        <div class="weekly-chart p-2">

            <strong class="side-component-title">
                <i class="fa fa-line-chart text-primary mr-2"></i>
                Weekly requests chart

                <i class="fa fa-refresh pull-right refresh-btn"></i>
            </strong>

            <div class="clearfix"></div>
            <LineChart :chart-data="chartData" :options="options" />

        </div>

    </div>

</template>

<style>

    .weekly-chart {
        margin-right: 300px;
    }

</style>

<script>

    import Health from './Health';
    import LineChart from '../../charts/LineChart'

    export default {
        name: 'Chart',
        components: {
            LineChart,
            Health
        },
        data() {
            return {
                chartData: {
                    labels: [
                        "1398-06-23",
                        "1398-06-24",
                        "1398-06-25",
                        "1398-06-26",
                        "1398-06-27",
                        "1398-06-28",
                        "1398-06-29",
                    ],
                    datasets: [
                        {
                            label: "Requests",
                            data: ["14","0","2","1","0","11","0"],
                            borderColor: "#035ece",
                            backgroundColor: "#031e41",
                            pointBackgroundColor: "#031e41",
                            borderWidth: 3,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        fontColor: 'white'
                    },
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero:true,
                                fontColor: 'white'
                            },
                            pointLabels: {
                                fontFamily: "nunito"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'white',
                            },
                            fontFamily: "nunito",
                        }]
                    },
                    title: {
                        display: true,
                        text: "Weekly requests",
                        fontSize: 20,
                        fontColor: 'white'
                    }
                }
            }
        },
        mounted() {}
    }

</script>