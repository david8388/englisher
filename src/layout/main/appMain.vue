<template>
  <div class="main">
    <sidebar />
    <div class="content-wrapper">
      <dashboard></dashboard>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar';
import Dashboard from '../../views/dashboard.vue';

export default {
  name: 'AppMain',
  components: {
    Sidebar,
    Dashboard
  }
}
</script>

<style lang="scss" scope>
@import "~@/styles/variables.scss";

.main {
  padding-left: $sidebar-width;
  .content-wrapper {
    background-color: #EAEAEA;
    //width: 100%;
    margin-top: $navbar-background-height;
  }
}

</style>
