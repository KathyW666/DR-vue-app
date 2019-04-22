<template>
  <div class="index">
    <HeadNav></HeadNav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav.vue";
export default {
  name: "index",
  components: {
    HeadNav
  }
};
</script>

<style media="screen">
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
