<template>
  <div class="main">
    <sidebar />
    <div class="content-wrapper">
      Hiiii
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar';

export default {
  name: 'AppMain',
  components: {
    Sidebar
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
