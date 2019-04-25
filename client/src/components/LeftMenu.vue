<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <router-link to="/course">
          <el-menu-item index="1">
            <i class="fa fa-margin fa-school"></i>
            <span slot="title">近期课程</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <!-- else 模块，判断若item没有children组件时的逻辑 -->
          <!-- 这里均手动设置，因此省略，但不能排除后续出现该情况 -->
          <!-- <el-submenu v-else :index="item.path" :key="item.path"> -->
          <!-- <template slot="title">
              <i :class="'fa fa-margin' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
        </el-submenu> -->
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "left-menu",
  data() {
    return {
      items: [
        {
          icon: "fa fa-margin " + "fa-money-check",
          name: "资金管理",
          path: "fund",
          children: [{ path: "fundlist", name: "资金流水" }]
        },
        {
          icon: "fa fa-margin " + "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    };
  }
};
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* 注意:not伪类会提高同一选择器的优先级 */
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
a {
  text-decoration: none;
}
i {
  padding-top: 5px;
}
</style>
