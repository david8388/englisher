<template>
  <div class="card card-height">
    <div
      class="card-body"
    >
      <div :style="{display: isShowQuestionCard ? 'none': ''}">
        <h5 class="card-title">Review</h5>
        <div class="form-group">
          <label>Number Of Questions</label>
          <select class="form-control">
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          @click="startTest"
        >
        Start a quiz
        </button>
      </div>

      <div
        :style="{display: isShowQuestionCard ? '': 'none'}"
        class="text-right"
      >
        <div class="progress">
          <div
            class="progress-bar bg-info"
            role="progressbar"
            :style="{width: test.nowIdx / test.count * 100 + '%'}"
            :aria-valuenow="test.nowIdx"
            aria-valuemin="0"
            :aria-valuemax="test.count">
            <p class="card-text">
              <small>{{ test.nowIdx }} / {{ test.count }}</small>
            </p>
          </div>
        </div>
        <br>
        <flip-card
          :question="question"
          :answer="answer"
        ></flip-card>
        <br>
        <button
          type="button"
          class="btn btn-secondary"
          @click="next"
        >
          Next question
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomWords } from '../api/apiService';
import { reactive, ref, computed } from 'vue';

export default {
  setup() {
    const words= reactive({
      list: [{}]
    })
    const test = reactive({
      count: 0,
      nowIdx: 0
    })
    const question = ref('')
    const answer = ref('')
    const isShow = ref(false)
    let idx = 0

    const isShowQuestionCard = computed(() => isShow.value)

    const next = () => {
      if (idx < words.list.data.length) {
        idx ++;
        test.nowIdx ++;
        question.value = words.list.data[idx].vocabulary
        answer.value = words.list.data[idx].expression
      }
    }

    const startTest = async () => {
      isShow.value = !isShow.value
      words.list = await getRandomWords()
      test.count = words.list.data.length
      question.value = words.list.data[0].vocabulary
      answer.value = words.list.data[0].expression
    }

    return {
      idx,
      words,
      next,
      question,
      answer,
      isShowQuestionCard,
      startTest,
      test
    }
  }
}
</script>

<style lang="scss" scoped>
.card-height {
  height: 550px;
  .flip-card {
    width: 100%;
  }
}
</style>
