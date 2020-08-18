<template>
  <div class="card card-wrapper">
    <div class="card-header">
      {{ title }}
    </div>
    <div class="card-body">
      <canvas
        ref="chart"
        height="150"
      />
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  props: {
    title: {
      type: String,
      default: ''
    },
    datasets: {
      type: Array,
      default() {
        return []
      }
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

<style scoped>
.card-wrapper {
  margin-bottom: 25px;
  margin-right: 0px;
}
</style>
