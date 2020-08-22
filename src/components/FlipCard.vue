<template>
  <div class="card flip-card">
    <div
      class="flip-card-inner"
      :class="isClick ?'flip-card-inner--rotateY' : ''"
    >
      <div class="flip-card-front">
        <div class="card-header">
          Question
          <button
            class="btn btn-primary"
            style="float: right; margin-top:-8px;"
            @click="isClick = !isClick"
          >
            Check the answer!
          </button>
        </div>
        <div class="card-body">
         <p class="card-text text-center">
           {{ question }}
         </p>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="card-header">
          Answer
          <button
            class="btn btn-primary"
            style="float: right;margin-top:-8px;"
            @click="isClick = !isClick"
          >
            Back to the question!
          </button>
        </div>
        <div class="card-body">
         <p class="card-text text-center">
           {{ answer }}
         </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FlipCard',
  props: {
    question: {
      type: String,
      default: 'Hi'
    },
    answer: {
      type: String,
      default: '(int)您好'
    }
  },
  setup() {
    const isClick = ref(false)

    return {
      isClick
    }
  }
}
</script>

<style scoped>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  /* background-color: transparent; */
  width: 50%;
  height: 300px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
/* .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
} */

.flip-card-inner--rotateY {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  color: black;
}

/* Style the back side */
.flip-card-back {
  color: black;
  transform: rotateY(180deg);
}
</style>
