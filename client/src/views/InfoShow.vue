<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" class="avatar" alt="" />
          <a href="https://en.gravatar.com/"
            ><span>在gravatar上传您的全球公认头像</span></a
          >
          <div class="userinfo">
            <div class="user-item">
              <i class="fa fa-user"></i>
              <span>{{ user.name }}</span>
            </div>
            <div class="user-item">
              <i class="fa fa-cog"></i>
              <span>{{
                user.identity == "manager" ? "管理员" : "普通员工"
              }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ user.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{
              user.identity == "manager" ? "管理员" : "普通员工"
            }}</span>
          </div>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {}
};
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  min-width: 300px;
  box-sizing: border-box;
  background: url(../assets/profile-bg.jpg) no-repeat;
  background-size: cover;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  padding: 10px;
  top: 30%;
  background: rgba(0, 0, 0, 0.2);
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user > a {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}
.userinfo {
  position: relative;
  margin: auto;
  top: 30%;
}
.user-item {
  display: inline;
  position: relative;
  top: 30%;
  padding: 16px;
  font-size: 20px;
  color: white;
}

i {
  margin-right: 10px;
}
a {
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: white;
}
</style>
