<template>
   <div class="card-header">
     {{ title }}
   </div>
   <div class="card-body">
     <p class="card-text text-center">{{ text }}</p>
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
