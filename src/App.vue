<template>
  <div>
    <navbar />
    <app-main />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import Navbar from './layout/navbar';
import AppMain from './layout/main/appMain';

@Options({
  components: {
    HelloWorld,
    Navbar,
    AppMain
  },
})
export default class App extends Vue {}
</script>
