<template>

    <div class="profile p-4">

        <h5 class="title-border-bottom">
            Chart
            <span class="clearfix"></span>
            <small>
                You can see the weekly api requests in below chart.
            </small>
        </h5>

        <div class="clearfix"></div>

        <LineChart :chart-data="chartData" :options="options" />

    </div>

</template>

<script>

    import LineChart from '../../charts/LineChart'

    export default {
        name: 'Chart',
        components: {
            LineChart,
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
        mounted() {



        }
    }

</script>