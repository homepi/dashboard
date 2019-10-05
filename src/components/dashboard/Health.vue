<template>

    <div class="health">

        <div class="charts">

            <strong class="side-component-title">
                <i class="fa fa-heartbeat text-danger mr-2"></i>
                Health care!

                <i class="fa fa-refresh pull-right refresh-btn" @click="updateCharts"></i>
            </strong>

            <div class="row">

                <div class="pull-left col-md-6">
                    <apexchart ref="cpu_chart"
                               height="200"
                               type="radialBar"
                               :options="cpu.options"
                               :series="cpu.series" />
                    <p class="text-center">
                        CPU Usage
                    </p>
                </div>

                <div class="pull-left col-md-6">
                    <apexchart ref="memory_chart"
                               height="200"
                               type="radialBar"
                               :options="memory.options"
                               :series="memory.series" />
                    <p class="text-center">Memory Usage</p>
                </div>

                <div class="pull-left col-md-12">
                    <apexchart ref="disk_chart"
                               height="200"
                               type="radialBar"
                               :options="disk.options"
                               :series="disk.series" />
                    <p class="text-center">Disk Usage</p>
                </div>

            </div>

        </div>

        <div class="recent-activities">

            <strong class="side-component-title">
                <i class="fa fa-sticky-note mr-2"></i>
                Recent Activities!
            </strong>

            <div class="activities pt-2">

                <div class="toast toast-dark opacity-1">
                    <div class="toast-header">
                        <strong class="mr-auto">Alireza Josheghani</strong>
                        <small>11 mins ago</small>
                    </div>
                    <div class="toast-body">
                        <img class="small-icon" src="../../assets/icons/doorbell.svg" />
                        Opened the yard door!
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {
        name: 'Health',
        data() {
            return {
                cpu: {
                    series: [0],
                    options: {
                        chart: {
                            toolbar: {
                                show: false
                            },
                        },
                        size: 90,
                        plotOptions: {
                            radialBar: {
                                startAngle: -90,
                                endAngle: 90,
                                track: {
                                    background: '#fff',
                                    strokeWidth: '67%',
                                    margin: 0, // margin is in pixels
                                    dropShadow: {
                                        enabled: true,
                                        top: -3,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.35
                                    }
                                },

                                dataLabels: {
                                    name: {
                                        show: false,
                                    },
                                    value: {
                                        offsetY: 0,
                                        formatter (val) {
                                            return parseInt(val) + "%";
                                        },
                                        color: '#ffffff',
                                        fontSize: '20px',
                                        show: true,
                                    }
                                }
                            }
                        },
                        colors: ["#28a745"],
                        labels: ['CPU Usage'],
                    }
                },
                memory: {
                    series: [0],
                    options: {
                        chart: {
                            toolbar: {
                                show: false
                            }
                        },
                        plotOptions: {
                            radialBar: {
                                startAngle: -90,
                                endAngle: 90,

                                track: {
                                    background: '#fff',
                                    strokeWidth: '67%',
                                    margin: 0, // margin is in pixels
                                    dropShadow: {
                                        enabled: true,
                                        top: -3,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.35
                                    }
                                },

                                dataLabels: {
                                    name: {
                                        show: false,
                                    },
                                    value: {
                                        offsetY: 0,
                                        formatter (val) {
                                            return parseInt(val) + "%";
                                        },
                                        color: '#ffffff',
                                        fontSize: '20px',
                                        show: true,
                                    }
                                }
                            }
                        },
                        colors: ["#28a745"],
                        labels: ['Memory Usage'],
                    }
                },
                disk: {
                    series: [0],
                    options: {
                        chart: {
                            toolbar: {
                                show: false
                            }
                        },
                        plotOptions: {
                            radialBar: {
                                startAngle: -90,
                                endAngle: 90,
                                track: {
                                    background: '#fff',
                                    strokeWidth: '67%',
                                    margin: 0, // margin is in pixels
                                    dropShadow: {
                                        enabled: true,
                                        top: -3,
                                        left: 0,
                                        blur: 4,
                                        opacity: 0.35
                                    }
                                },

                                dataLabels: {
                                    name: {
                                        show: false,
                                    },
                                    value: {
                                        offsetY: 0,
                                        formatter (val) {
                                            return parseInt(val) + "%";
                                        },
                                        color: '#ffffff',
                                        fontSize: '20px',
                                        show: true,
                                    }
                                }
                            }
                        },
                        colors: ["#28a745"],
                        labels: ['Disk Usage'],
                    }
                },
            }
        },
        methods: {

            updateCharts() {

                this.updateCpuChart(0);
                this.updateMemoryChart(0);
                this.updateDiskChart(0);

                this.$store.dispatch('getHealth').then((response) => {

                    let data = response.data.result;

                    this.updateCpuChart(data.cpu.used_percentage.toFixed());
                    this.updateMemoryChart(data.memory.usedPercent.toFixed());
                    this.updateDiskChart(data.disk.usage.usedPercent.toFixed());

                });

            },

            updateCpuChart(value) {
                this.$refs.cpu_chart.updateSeries([value]);
                this.checkChartColor(value, this.$refs.cpu_chart);
            },

            updateMemoryChart(value) {
                this.$refs.memory_chart.updateSeries([value]);
                this.checkChartColor(value, this.$refs.memory_chart);
            },

            updateDiskChart(value) {
                this.$refs.disk_chart.updateSeries([value]);
                this.checkChartColor(value, this.$refs.disk_chart);
            },

            checkChartColor(value, chart) {
                if (value > 70){
                    chart.updateOptions({
                        colors: ["#dc3545"],
                    });
                } else if (value < 70 && value > 40) {
                    chart.updateOptions({
                        colors: ["#ffc107"],
                    });
                } else {
                    chart.updateOptions({
                        colors: ["#28a745"],
                    });
                }
            }
        },
        mounted() {
            this.updateCharts();
        }
    }
</script>

<style>

    .refresh-btn {
        cursor: pointer;
    }

    .refresh-btn:hover {
        color: #28a745;
    }

    strong.side-component-title {
        border-bottom: 2px solid #333;
        padding: 4px;
        display: block;
    }

    .health {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        background: #181818;
        height: 100%;
        padding: 10px;
    }

</style>