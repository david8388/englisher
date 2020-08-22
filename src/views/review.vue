<template>
  <button
    type="button"
    class="btn btn-secondary"
    @click="next"
  >
    Next question
  </button>
  <flip-card
    :question="question"
    :answer="answer"
  ></flip-card>
</template>

<script>
import { getRandomWords } from '../api/apiService';
import { reactive, onMounted, ref } from 'vue';

export default {
  setup() {
    const words= reactive({
      list: [{}]
    })
    const question = ref('')
    const answer = ref('')
    let idx = 0

    onMounted(async () => {
      words.list = await getRandomWords()
      question.value = words.list.data[0].vocabulary
      answer.value = words.list.data[0].expression
    })

    const next = () => {
      if (idx < words.list.data.length) {
        idx ++;
        question.value = words.list.data[idx].vocabulary
        answer.value = words.list.data[idx].expression
      }
    }

    return {
      idx,
      words,
      next,
      question,
      answer
    }
  }
}
</script>

