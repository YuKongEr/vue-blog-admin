<template>
  <el-menu class="sidebar-menu  sidebar" :default-active="onRoutes" mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="sidebar.opened" unique-opened router>

    <template v-for="item in items">

      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.title">

          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>

          <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
            <span slot="title">{{ subItem.title }}</span>

          </el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.title">

          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>

        </el-menu-item>
      </template>
    </template>
  </el-menu>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      opened: this.$store.state.home.sidebar.opened,
      items: [
        {
          icon: "el-icon-star-on",

          index: "readme",
          title: "后台首页"
        },
        {
          icon: "el-icon-edit",

          index: "markdown",
          title: "发布"
        },
        {
          icon: "el-icon-date",
          index: "3",
          title: "管理",
          subs: [
            {
              index: "baseform",
              title: "基本表单"
            },

            {
              index: "basetable",
              title: "基础表格"
            },
            {
              index: "vuetable",
              title: "Vue表格组件"
            },
            {
              index: "upload",
              title: "文件上传"
            }
          ]
        },
        {
          icon: "el-icon-setting",

          index: "basecharts",
          title: "设置"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    sidebar() {
      console.log(this.$store.state.home.sidebar.opened);
      return this.$store.state.home.sidebar;
    }
  }
};
</script>

<style scoped>
.sidebar-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
}
.sidebar > ul {
  height: 100%;
}
</style>
