<template>
  <div class="main">
    <sidebar />
    <div class="content-wrapper">
      <div class="content-fluid">
        <router-view :key="path" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Sidebar from './sidebar';

export default {
  name: 'AppMain',
  components: {
    Sidebar
  },
  setup() {
    const path = computed(() => sessionStorage.getItem('activeItem') || '')

    return {
      path
    }
  }
}
</script>

<style lang="scss" scope>
@import "~@/styles/variables.scss";

.main {
  padding-left: $sidebar-width;
  .content-wrapper {
    background-color: #FFF;
    margin-top: $navbar-background-height;
  }
  .content-fluid {
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    padding: 32px;
  }
}

</style>
