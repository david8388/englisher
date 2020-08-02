<template>
  <div>
    <form @submit="save" @reset="reset">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Vocabulary</label>
        <div class="col-sm-10">
          <input
            class="form-control"
            placeholder="tree"
            v-model="form.vocabulary"
          >
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Expression</label>
        <div class="col-sm-10">
          <input
            class="form-control"
            placeholder="(n)樹"
            v-model="form.expression"
          >
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Example</label>
        <div class="col-sm-10">
          <textarea
            class="form-control"
            rows="3"
            placeholder="He is making a clothes tree"
            v-model="form.example"
          />
        </div>

      </div>
      <button type="submit" class="btn btn-primary mb-2">Save</button>
      <button type="reset" class="btn btn-primary mb-2">Reset</button>
    </form>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Vocabulary</th>
          <th scope="col">Expression</th>
          <th scope="col">Example</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data.list"
          :key="index"
        >
          <th>{{ row.vocabulary }}</th>
          <th>{{ row.expression }}</th>
          <th>{{ row.example }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue';

export default {
  setup() {
    const form = reactive({
      vocabulary: '',
      expression: '',
      example: ''
    })

    const data= reactive({
      list: [{}]
    })

    const isNumber = (val: any) => !isNaN(val)

    onMounted(() => {
      data.list = []
      Object.keys(localStorage)
        .filter(key => isNumber(key))
        .forEach(key => {
          const {vocabulary, expression, example} = JSON.parse(localStorage.getItem(key))
          debugger
          data.list.push({
            vocabulary,
            expression,
            example
          })
        })
      console.log('component is mounted!', data.list  )
    })

    function reset() {
      form.vocabulary = ''
      form.expression = ''
      form.example = ''
    }

    function save() {
      localStorage.setItem(Date.now().toString(), JSON.stringify(form))
    }

    return {
      form,
      reset,
      save,
      data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
