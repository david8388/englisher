<template>
  <div>
    <div class="card-deck">
      <div
        class="w-25"
        v-for="(com, index) in components"
        :key="index"
      >
        <card
          :title="com.title"
          :text="com.text"
        />
      </div>
    </div>
    <div class="card-deck">
      <chart
        class="w-50"
        :title="'created and reviewed by day'"
        :datasets="datasets"
      />
      <chart
        class="w-50"
        :title="'listened by day'"
        :datasets="datasets"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { Grid } from 'ag-grid/main'
import moment from 'moment'
import { getTotal } from '../api/apiService';

export default {
  setup() {
    let total = 0
    let created = 0
    const createdHistory = [0,0,0,0,0]
    const today = moment(new Date())

    Object.keys(localStorage).forEach(key => {
      if(key == +key) {
        total += 1
        const diff = today.diff(new Date(+key), 'days')
        if (diff === 0) {
          createdHistory[0] += 1
        } else if (diff === 1) {
          createdHistory[1] += 1
        } else if (diff === 2) {
          createdHistory[2] += 1
        } else if (diff === 3) {
          createdHistory[3] += 1
        } else if (diff === 4) {
          createdHistory[4] += 1
        }
      }

      if (new Date().toDateString() === new Date(+key).toDateString()) {
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
      },
      {
        title: 'Listened Today',
        text: '1 min'
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
                x: moment(),
                y: createdHistory[0]
              },
              {
                x: moment().subtract(1, 'days'),
                y: createdHistory[1]
              },
              {
                x: moment().subtract(2, 'days'),
                y: createdHistory[2]
              },
              {
                x: moment().subtract(3, 'days'),
                y: createdHistory[3]
              },
              {
                x: moment().subtract(4, 'days'),
                y: createdHistory[4]
              }
            ],
            label: 'Created',
            borderColor: "#3e95cd",
            fill: false
          }
        ])
    onMounted(async () => {
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

      const { data: total } = await getTotal()
      components[0].text = total
      gridOptions.rowData = data

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
