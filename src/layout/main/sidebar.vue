<template>
  <div class="sidebar-container">
    <div class="sidebar-inner-scroll">
      <router-link to="/">
        <ul class="sidebar-navigation">
          <li>Dashboard</li>
        </ul>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.sidebar-container {
  top: $navbar-background-height;
  position: fixed;
  width: $sidebar-width;
  height: 100%;
  left: 0;
  color: #FFF;
  background-color: #FFF;
  box-shadow: inset -1px 0 0 $divider;
  & .sidebar-inner-scroll {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  & .sidebar-navigation {
    color: #707070;
    padding-left: 0;
    list-style: none
  }
}


// .content-container {
//   padding-top: 20px;
// }

// .sidebar-navigation {
//   padding: 0;
//   margin: 0;
//   list-style-type: none;
//   position: relative;
// }

// .sidebar-navigation li {
//   background-color: transparent;
//   position: relative;
//   display: inline-block;
//   width: 100%;
//   line-height: 20px;
// }

// .sidebar-navigation li a {
//   padding: 10px 15px 10px 30px;
//   display: block;
//   color: #fff;
// }

// .sidebar-navigation li .fa {
//   margin-right: 10px;
// }

// .sidebar-navigation li a:active,
// .sidebar-navigation li a:hover,
// .sidebar-navigation li a:focus {
//   text-decoration: none;
//   outline: none;
// }

// .sidebar-navigation li::before {
//   background-color: #2574A9;
//   position: absolute;
//   content: '';
//   height: 100%;
//   left: 0;
//   top: 0;
//   -webkit-transition: width 0.2s ease-in;
//   transition: width 0.2s ease-in;
//   width: 3px;
//   z-index: -1;
// }

// .sidebar-navigation li:hover::before {
//   width: 100%;
// }

// .sidebar-navigation .header {
//   font-size: 12px;
//   text-transform: uppercase;
//   background-color: #151515;
//   padding: 10px 15px 10px 30px;
// }

// .sidebar-navigation .header::before {
//   background-color: transparent;
// }

// .content-container {
//   padding-left: 220px;
// }
</style>
