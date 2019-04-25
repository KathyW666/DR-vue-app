<template>
  <div class="banner">
    <div class="courseContainer">
      <el-carousel :interval="2000" height="600px" indicator-position="outside">
        <el-carousel-item
          v-for="item in banners"
          :key="item"
          :label="item.teacher"
        >
          <img class="bannerImg" :src="item.pic" alt="recent_course" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      banners: [
        //写在data里面的路径只会当成一个字符串，
        //当使用：src=""来绑定的时候不能达到预期的效果，
        //解决的办法有解决的办法有url: require（'.assert/1.jpm'）
        //手动把图片引入，否则配置的loader是不会根据图片路径把图片找出来
        { teacher: "Lulu", pic: require("../assets/banner/banner01.jpg") },
        { teacher: "Lulu", pic: require("../assets/banner/banner02.jpg") },
        { teacher: "Lulu", pic: require("../assets/banner/banner03.png") },
        { teacher: "小明", pic: require("../assets/banner/banner04.jpg") }
      ]
    };
  }
};
</script>

<style>
.banner {
  background: url(../assets/profile-bg.jpg) no-repeat;
  background-size: cover;
}
.courseContainer {
  background: rgba(0, 0, 0, 0.5);
}
.bannerImg {
  width: 600px;
  height: 400px;
  opacity: 1;
}
.el-carousel__item {
  color: #475669;
  font-size: 14px;
  line-height: 200px;
  margin: 0;
  text-align: center;
  padding-top: 100px;
}
</style>
