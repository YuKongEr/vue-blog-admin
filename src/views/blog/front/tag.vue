<template>
  <div>
    <article class="article article-tags post-type-list" itemscope>
      <header class="article-header">
        <h1 itemprop="name" class="hidden-xs">{{tagName}}</h1>
        <p class="text-muted hidden-xs">{{tagList | formateCount}}</p>
        <nav role="navigation" id="nav-main" class="okayNav" style="visibility:visible">
          <ul>
            <router-link tag="li" to="/blog/tag" style="margin-left:0;margin-right: 15px;margin-top: 15px; ">
              <a>All</a>
            </router-link>
            <router-link style="margin-left:0;margin-right: 15px;margin-top: 15px; " v-for="tag in tagList" :key="tag.id" tag="li" v-bind:to="'/blog/tag/' + tag.tagName">
              <a>{{tag.tagName}}</a>
            </router-link>
          </ul>
        </nav>
      </header>
      <div class="article-body">
        <div v-for="tag in tagList" :key="tag.id" v-if="tag.count>0 && articles[tag.tagName]">
          <router-link tag="h3" class="panel-title mb-1x" v-bind:to="'/blog/tag/' + tag.tagName">
            <a v-bind:title="'#' + tag.tagName">{{ '#' + tag.tagName}}</a>
            <small class="text-muted">{{'(Total ' +tag.count+ ' articles)'}}</small>
          </router-link>
          <div class="row">
            <div class="col-md-6" v-for="(article,index) in articles[tag.tagName]" :key="index">
              <article class="panel panel-default hover-shadow hover-grow" itemscope itemtype="http://schema.org/BlogPosting">
                <div class="panel-body">
                  <div class="article-meta">
                    <time v-bind:datetime="article.publishTime" itemprop="datePublished">{{article.publishTime | formatDate}}</time>
                  </div>
                  <h3 class="article-title" itemprop="name">
                    <router-link tag="a" v-bind:to="'/blog/article/'+ article.id" class="article-link">{{article.articleTitle}}</router-link>
                  </h3>
                </div>
                <div class="panel-footer">
                  <router-link v-for="_tag in article.tags" :key="_tag.id" tag="a" v-bind:to="'/blog/tag/' + _tag.tagName" class="label label-default mb"
                    style="margin-right: 5px">{{_tag.tagName}}</router-link>
                </div>
              </article>
            </div>

          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
  import {
    findAllTag,
    findArticleGroupByTag
  } from '@/api/api'
  import {
    formatDate
  } from "@/config/mUtils";
  export default {
    data() {
      return {
        tagName: "标签",
        articles: {},
        tagList: []
      }
    },

    filters: {
      formateCount(param) {
        let count = 0;
        console.log(param)
        param.forEach(element => {
          if (element.count > 0) count++;
        });
        return '共 ' + count + ' 个标签';
      },
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }
    },
    created() {
      this.getData(this.$route)
    },
    methods: {
      async getData(route) {
        let query = "";
        if (route.params.tagName != "" && route.params.tagName != undefined) {
          query = "/" + route.params.tagName;
          this.tagName = "标签：" + route.params.tagName;
        } else {
          query = "";
          this.tagName = "标签";
        }
        let tagRes = await findAllTag();
        this.tagList = tagRes.data;
        let res = await findArticleGroupByTag(query);
        this.articles = res.data;
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path.indexOf("/blog/tag") >= 0) {
          this.getData(to);
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>