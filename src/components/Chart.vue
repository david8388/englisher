<template>
  <canvas ref="chart"/>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  props: {
    datasets: Array,
    default() {
      return []
    }
  },
  mounted() {
    new Chart(this.$refs.chart, {
      type: 'line',
      options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                }
            }]
        }
      },
      data: {
        datasets: this.datasets
      }
    })
  }
}
</script>
