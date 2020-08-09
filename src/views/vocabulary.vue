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
    <div id="myGrid" style="height: 300px;" class="ag-theme-balham"></div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { Grid } from "ag-grid/main";

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
        { headerName: 'Key', field: 'key', hide: true},
        { headerName: 'Vocabulary', field: 'vocabulary', editable: true,
          filter: 'agTextColumnFilter',
          filterParams: {
            caseSensitive: true,
            defaultOption: 'contains',
          },
        },
        { headerName: 'Expression', field: 'expression', editable: true},
        { headerName: 'Example', field: 'example', editable: true}
      ],
      rowData: [{}],
      editType: 'fullRow',
      onRowValueChanged: onRowValueChanged
    };

    onMounted(() => {
      data.list = []
      gridOptions.rowData = []
      Object.keys(localStorage)
        .filter(key => isNumber(key))
        .forEach(key => {
          const {vocabulary, expression, example} = JSON.parse(localStorage.getItem(key))
          data.list.push({
            vocabulary,
            expression,
            example
          })
          gridOptions.rowData.push({
            key,
            vocabulary,
            expression,
            example
          })
        })
      const eGridDiv = document.querySelector('#myGrid');
      new Grid(eGridDiv, gridOptions);
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
