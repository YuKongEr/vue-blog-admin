<template>
  <div class="content article-list">
    <article class="article article-type-post" itemscope itemtype="http://schema.org/BlogPosting" v-for="article in articleList"
      :key="article.id">
      <div class="article-header">
        <h1 itemprop="name">
          <router-link tag="a" :to="'/blog/article/' + article.id" class="article-title">
            {{article.articleTitle}}
          </router-link>
        </h1>
      </div>
      <p class="article-meta">
        <span class="article-date">
          <i class="icon icon-calendar-check"></i>
          <a href="#" class="article-date">
            <time v-bind:datetime="article.publishTime" itemprop="datePublished">{{article.publishTime |formatDate}}
            </time>
          </a>
        </span>
        <span class="article-category">
          <i class="icon icon-folder"></i>
          <router-link tag="a" class="article-category-link" v-bind:to="'/blog/tag/' + article.category.categoryName">{{article.category.categoryName}}</router-link>
        </span>
        <span class="article-tag" v-for="tag in article.tags" :key="tag.id">
          <i class="icon icon-tags"></i>

          <router-link class="article-tag-link" tag="a" v-bind:to="'/blog/tag/' + tag.tagName">{{tag.tagName}}</router-link>
        </span>
        <span class="post-comment">
          <i class="icon icon-comment"></i>
          <a class="article-comment-link">评论</a>
        </span>
        <!-- <span class="post-wordcount hidden-xs" itemprop="wordCount">字数统计: 1,011(字)</span>
        <span class="post-readcount hidden-xs" itemprop="timeRequired">阅读时长: 5(分)</span>-->
      </p>
    </article>

  </div>
</template>
<script>
  import {
    formatDate
  } from "@/config/mUtils";
  import {
    getFrontArticlePage
  } from '@/api/api'
  export default {
    data() {
      return {
        pageSettings: {
          currPage: 0,
          pageSize: 10
        },
        articleList: []
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "MM月dd");
      }
    },
    created() {
      this.getArticleList();
    },
    methods: {
      async getArticleList() {
        let res = await getFrontArticlePage({
          currPage: this.pageSettings.currPage,
          pageSize: this.pageSettings.pageSize
        })
        this.articleList = res.content;
        console.log(this.articleList)
      }
    }
  }
</script>
<style lang="less" scoped>
</style>