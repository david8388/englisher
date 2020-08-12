<template>
  <div>
    <div class="card-deck">
      <div
        class="card w-25"
        v-for="(com, index) in components"
        :key="index"
      >
        <card
          :title="com.title"
          :text="com.text"
        />
      </div>
    </div>
    <chart
      :datasets="datasets"
    />
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { Grid } from "ag-grid/main";

export default {
  setup() {
    let total = 0
    let created = 0

    Object.keys(localStorage).forEach(key => {
      if(key == +key) {
        total += 1
      }
      if (new Date().toDateString() === new Date(key).toDateString()) {
        created += 1
      }
    })
    const components = reactive([
      {
        title: 'Total Vocabulary',
        text: total
      },
      {
        title: 'Created Today',
        text: created
      },
      {
        title: 'Reviewed Today',
        text: 0
      }
    ])
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

    const datasets = reactive([
          {
            data: [
              {
                x: new Date('2020-08-08'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-07'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-06'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-05'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-04'),
                y: Math.random()* 100
              }
            ],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          },
          {
            data: [
              {
                x: new Date('2020-08-08'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-07'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-06'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-05'),
                y: Math.random()* 100
              },
              {
                x: new Date('2020-08-04'),
                y: Math.random()* 100
              }
            ],
            label: "Africa2",
            borderColor: "#3e95cd",
            fill: false
          }
        ])
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
      data,
      components,
      datasets
    }
  },
  isNumber(val: any) {
    return typeof val === "number" && !isNaN(val)
  }
}
</script>
