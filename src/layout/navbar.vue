<template>
  <nav class="navbar fixed-top navbar-dark navbar-background">
    <span class="navbar-title">
      Englisher
    </span>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  padding: 0 16px;
}

.navbar-background {
  min-height: $navbar-background-height;
  background: black;
  border-bottom: 1px solid $divider;
  & .navbar-title {
    font-size: 18px;
    color: #FFF;
  }
}
</style>

