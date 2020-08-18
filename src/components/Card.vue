<template>
  <div class="card card-wrapper">
    <div class="card-header">
      {{ title }}
    </div>
    <div class="card-body">
      <p class="card-text text-center">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style scoped>
.card-wrapper {
  margin-bottom: 25px;
  margin-right: 0px;
}
</style>
