import { createApp } from 'vue'
import router from './router';
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import Card from './components/Card.vue';
import Chart from './components/Chart.vue';
import FlipCard from './components/FlipCard.vue';


const app = createApp(App)

app.use(router)
app.component('card', Card)
app.component('chart', Chart)
app.component('FlipCard', FlipCard)
app.mount('#app')
