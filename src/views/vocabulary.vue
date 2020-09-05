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
    <form
      class="form-inline"
      @submit.prevent="query"
    >
      <div
        class="input-group mb-2 mr-sm-2"
        v-for="(date, index) in dates"
        :key="index"
      >
        <div class="input-group-prepend">
          <div class="input-group-text">{{ date }}</div>
        </div>
        <input type="date" class="form-control">
      </div>
      <div class="input-group mb-2 mr-sm-2">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Query
        </button>
      </div>
    </form>
    <div id="myGrid" style="height: 300px;" class="ag-theme-balham"></div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { Grid } from "ag-grid/main";
import { saveWord, getWords, getWordsWithFilter } from '../api/apiService';

export default {
  setup() {
    let grid = null
    const form = reactive({
      vocabulary: '',
      expression: '',
      example: ''
    })

    const data= reactive({
      list: [{}]
    })

    const dates = reactive(['StartDate', 'EndDate'])

    function onRowValueChanged(params) {
      const {key, vocabulary, expression, example} = params.data
      const dataStr = JSON.stringify({vocabulary, expression, example})
      localStorage.setItem(key, dataStr)
    }

    const gridOptions = {
      defaultColDef: {
        //flex: 1,
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      columnDefs: [
        { headerName: 'Id', field: 'id', hide: true},
        { headerName: 'Vocabulary', field: 'vocabulary', editable: true},
        { headerName: 'Expression', field: 'expression', editable: true},
        { headerName: 'Example', field: 'example', editable: true}
      ],
      rowData: [{}],
      editType: 'fullRow',
      onRowValueChanged: onRowValueChanged
    };

    onMounted(async () => {
      const { data = [] } = await getWords()
      gridOptions.rowData = data
      const eGridDiv = document.querySelector('#myGrid');
      grid = new Grid(eGridDiv, gridOptions);
    })

    function reset() {
      form.vocabulary = ''
      form.expression = ''
      form.example = ''
    }

    function save() {
      saveWord(form)
    }

    async function query(e) {
      let [startDate, endDate] = e.currentTarget
      startDate = startDate.value === '' ? new Date(0).toISOString() : new Date(startDate.value).toISOString(),
      endDate =  endDate.value === '' ? new Date().toISOString() : new Date(endDate.value).toISOString()
      const { data = [] } = await getWordsWithFilter(startDate, endDate)
      gridOptions.api.setRowData(data)
    }

    return {
      form,
      reset,
      save,
      data,
      query,
      dates
    }
  }
}
</script>
