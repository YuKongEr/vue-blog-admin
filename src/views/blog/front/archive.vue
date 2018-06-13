<template>
  <div>
    <article class="content article article-archives article-type-list" itemscope>
      <header class="article-header">
        <h1 itemprop="title" style="margin-top: 0;">{{archiveDate}}</h1>
        <p class="text-muted">共 {{blogCount}} 篇文章</p>
      </header>
      <div class="article-body">
        <section class="panel panel-default b-no" v-for="(item,key) in years" :key="key">
          <div class="panel-heading" role="tab">
            <h3 class="panel-title">
              <a data-toggle="collapse" v-bind:href="'#collapse'+item" aria-expanded="true">
                <i class="icon icon-calendar-plus text-active"></i>
                <i class="icon icon-calendar-minus text"></i> {{item}}</a>
            </h3>
          </div>
          {{articles.item}}
          <div v-bind:id="'collapse'+item" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading2018">
            <div class="panel-body">
              <div class="collection">
                <router-link tag="a" class="collection-item" v-for="ele in articles[item]" :to="'/blog/article/' + ele.id" :key="ele.id">
                  <time v-bind:datetime="ele.publishTime" itemprop="datePublished">{{ele.publishTime | formatDate}}</time>
                  <span>&nbsp;&nbsp;&nbsp;</span> {{ele.articleTitle}}</router-link>

              </div>
            </div>
          </div>
        </section>

      </div>
    </article>
  </div>
</template>
<script>
  import './js/plugin.min.js'

  import {
    findArticleGroupByYear,
    getArchiveByYearAndMonth
  } from '@/api/api'
  import {
    formatDate
  } from "@/config/mUtils";
  export default {
    data() {
      return {
        articles: {},
        archiveDate: "归档"
      }
    },
    computed: {
      years() {
        let newkey = Object.keys(this.articles).sort().reverse();
        return newkey; //返回排好序的新对象 }
      },
      blogCount() {
        let count = 0;
        Object.keys(this.articles).forEach(element => {
          let value = this.articles[element];
          count += value.length;
        });
        return count;
      }
    },

    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }
    },
    created() {
      if (this.$route.params.year != "" && this.$route.params.year != undefined) {
        this.getDataByYearAnMonth({
          year: this.$route.params.year,
          month: this.$route.params.month
        })
        this.archiveDate = "归档:" + this.$route.params.year + "/" + this.$route.params.month;
      } else {
        this.getData();

      }
    },
    methods: {
      async getData() {
        let res = await findArticleGroupByYear();
        this.articles = res.data;
      },
      async getDataByYearAnMonth(query) {
        let res = await getArchiveByYearAndMonth(query);
        this.articles = res.data;
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.path.indexOf("/archive") >= 0) {

          if (to.params.year != "" && to.params.year != undefined) {
            this.getDataByYearAnMonth({
              year: to.params.year,
              month: to.params.month
            })
            this.archiveDate = "归档:" + to.params.year + "/" +
              to.params.month;
          } else {
            this.getData();
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>