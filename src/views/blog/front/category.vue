<template>
  <div>
    <article class="article article-categories article-type-list" itemscope>
      <header class="article-header">
        <h1 itemprop="name" style="margin-top: 0;">{{categoryName}}</h1>
        <p class="text-muted hidden-xs">{{categoryList | formateCount}}</p>
        <nav id="nav-main" class="okayNav" style="visibility:visible">
          <ul>
            <router-link tag="li" to="/blog/category/" style=" margin-left:0;margin-right: 15px;margin-top: 15px; ">
              <a href="/categories">All</a>
            </router-link>
            <router-link tag="li" style="margin-left: 0;margin-right: 15px;margin-top: 15px;" v-for="category in categoryList" :key="category.id"
              v-if="category.count>0" v-bind:to="'/blog/category/' + category.categoryName">
              <a>{{category.categoryName}}</a>
            </router-link>
          </ul>
        </nav>
      </header>
      <div class="article-body">
        <div class="panel panel-default b-no" v-for="category in categoryList" :key="category.id" v-if="category.count>0 && articles[category.categoryName] ">
          <div class="panel-heading" role="tab">
            <h3 class="panel-title">
              <a data-toggle="collapse" v-bind:href="'#collapse'+category.id" aria-expanded="true">
                <i class="icon icon-folder text-active"></i>
                <i class="icon icon-folder-open text"></i> {{category.categoryName}} </a>
              <small class="text-muted">{{'(Total '+category.count+ ' articles)'}}</small>
            </h3>
          </div>
          <div v-bind:id="'collapse'+category.id" class="panel-collapse collapse in" role="tabpanel" v-if="category.count>0 && articles[category.categoryName] "
            aria-labelledby="heading开发工具">
            <div class="panel-body">
              <div class="collection">
                <router-link tag="a" v-for="article in articles[category.categoryName]" :key="article.id" :to="'/blog/article/' + article.id"
                  class="collection-item" itemprop="url">
                  <time datetime="2017-12-17T10:32:51.000Z" itemprop="datePublished">{{ article.publishTime|formatDate}}</time>
                  <span>&nbsp;&nbsp;&nbsp;</span> {{article.articleTitle}}</router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </article>
  </div>
</template>
<script>
  import './js/plugin.min.js'
  import {
    findAllCategory,
    findArticleGroupByCategory,
    findCategoryByName
  } from '@/api/api'
  import {
    formatDate
  } from "@/config/mUtils";
  export default {
    data() {
      return {
        categoryList: [],
        articles: {},
        categoryName: "分类"
      }
    },
    filters: {
      formateCount(param) {
        let count = 0;
        param.forEach(element => {
          if (element.count > 0)
            count++;
        });
        return '共 ' + count + ' 个分类';
      },
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }

    },
    async created() {
      this.getData(this.$route);
    },
    methods: {
      async getData(route) {
        let query = "";
        if (route.params.categoryName != "" && route.params.categoryName != undefined) {
          query = "/" +
            route.params.categoryName;
          this.categoryName = "分类：" + route.params.categoryName;
        } else {
          query = "";
          this.categoryName = "分类";
        }
        let categoryRes = await findAllCategory();
        this.categoryList = categoryRes.data;
        let res = await findArticleGroupByCategory(query);
        this.articles = res.data;
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path.indexOf("/blog/category") >= 0) {
          this.getData(to);
        }
      }
    }

  }
</script>
<style lang="less" scoped>
</style>