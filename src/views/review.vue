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
          v-if="test.nowIdx < test.count"
          type="button"
          class="btn btn-secondary"
          @click="next"
        >
          Next question
        </button>
        <button
          v-else
          type="button"
          class="btn btn-secondary"
          @click="complete"
        >
          Complete
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
      nowIdx: 1
    })
    const question = ref('')
    const answer = ref('')
    const isShow = ref(false)

    const isShowQuestionCard = computed(() => isShow.value)

    const next = () => {
      if (test.nowIdx < words.list.data.length) {
        question.value = words.list.data[test.nowIdx].vocabulary
        answer.value = words.list.data[test.nowIdx].expression
        test.nowIdx ++;
      }
    }

    const startTest = async () => {
      isShow.value = !isShow.value
      test.nowIdx = 1
      words.list = await getRandomWords()
      test.count = words.list.data.length
      question.value = words.list.data[0].vocabulary
      answer.value = words.list.data[0].expression
    }

    const complete = () => {
      isShow.value = !isShow.value
    }

    return {
      words,
      next,
      question,
      answer,
      isShowQuestionCard,
      startTest,
      test,
      complete
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
