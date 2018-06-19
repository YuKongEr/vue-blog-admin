<style scoped>
  @import './css/style.css';
</style>
<template>
  <div style="    position: relative;
 overflow-x: hidden; padding-right: 0 !important; font-family: -apple-system, system-ui, BlinkMacSystemFont, ' Segoe UI ',
Roboto, 'Helvetica Neue ', Arial,'PingFang SC ', 'Hiragino Sans GB ', 'Microsoft YaHei ', sans-serif; font-size: 14px; line-height:
1.42857; color: #333; background-color: #fff;" class="main-center" itemscope itemtype="http://schema.org/WebPage">
    <header class="header" itemscope itemtype="http://schema.org/WPHeader">
      <div class="slimContent">
        <div class="navbar-header">
          <div class="profile-block text-center">
            <a id="avatar" href="https://github.com/YuKongEr" target="_blank">
              <img class="img-circle img-rotate" src="./images/avatar.jpg" width="200" height="200">
            </a>
            <h2 id="name" class="hidden-xs hidden-sm">{{person.name}}</h2>
            <h3 id="title" class="hidden-xs hidden-sm hidden-md">{{person.desc}}</h3>
            <small id="location" class="text-muted hidden-xs hidden-sm">
              <i class="icon icon-map-marker"></i> {{person.address}}</small>
          </div>
          <div class="search" id="search-form-wrap">
            <form class="search-form sidebar-form">
              <div class="input-group">
                <input type="text" class="search-form-input form-control" placeholder="搜索">
                <span class="input-group-btn">
                  <button type="submit" class="search-form-submit btn btn-flat" onclick="return!1">
                    <i class="icon icon-search"></i>
                  </button>
                </span>
              </div>
            </form>
            <div class="ins-search">
              <div class="ins-search-mask"></div>
              <div class="ins-search-container">
                <div class="ins-input-wrapper">
                  <input type="text" class="ins-search-input" placeholder="想要查找什么..." x-webkit-speech>
                  <button type="button" class="close ins-close ins-selectable" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="ins-section-wrapper">
                  <div class="ins-section-container"></div>
                </div>
              </div>
            </div>
          </div>
          <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <nav id="main-navbar" class="collapse navbar-collapse" itemscope itemtype="http://schema.org/SiteNavigationElement" role="navigation">
          <ul class="nav navbar-nav main-nav">
            <router-link tag="li" to="/blog/index" class="menu-item menu-item-home">
              <a>
                <i class="icon icon-home-fill"></i>
                <span class="menu-title">
                  首页
                </span>
              </a>
            </router-link>
            <router-link tag="li" class="menu-item menu-item-archives" to="/blog/archive">
              <a>
                <i class="icon icon-archives-fill"></i>

                <span class="menu-title">
                  归档
                </span>
              </a>
            </router-link>
            <router-link tag="li" class="menu-item menu-item-categories" to="/blog/category">
              <a>
                <i class="icon icon-folder"></i>
                <span class="menu-title">分类</span>
              </a>
            </router-link>
            <router-link tag="li" class="menu-item menu-item-tags" to="/blog/tag">
              <a>
                <i class="icon icon-tags"></i>
                <span class="menu-title">标签</span>
              </a>
            </router-link>
          <!--  <li class="menu-item menu-item-repository">
              <a href="/repository">
                <i class="icon icon-project"></i>
                <span class="menu-title">项目</span>
              </a>
            </li>
            <li class="menu-item menu-item-books">
              <a href="/books">
                <i class="icon icon-book-fill"></i>
                <span class="menu-title">书单</span>
              </a>
            </li>
            <li class="menu-item menu-item-links">
              <a href="/links">
                <i class="icon icon-friendship"></i>
                <span class="menu-title">友链</span>
              </a>
            </li>
            <li class="menu-item menu-item-about">
              <a href="/about">
                <i class="icon icon-cup-fill"></i>
                <span class="menu-title">关于</span>
              </a>
            </li>-->
          </ul>
          <ul class="social-links">
            <li>
              <a href="https://github.com/cofess" target="_blank" title="Github" data-toggle="tooltip" data-placement="top">
                <i class="icon icon-github"></i>
              </a>
            </li>
            <li>
              <a href="http://weibo.com/cofess" target="_blank" title="Weibo" data-toggle="tooltip" data-placement="top">
                <i class="icon icon-weibo"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/iwebued" target="_blank" title="Twitter" data-toggle="tooltip" data-placement="top">
                <i class="icon icon-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/cofess" target="_blank" title="Behance" data-toggle="tooltip" data-placement="top">
                <i class="icon icon-behance"></i>
              </a>
            </li>
            <li>
              <a href="/atom.xml" target="_blank" title="Rss" data-toggle="tooltip" data-placement="top">
                <i class="icon icon-rss"></i>
              </a>
            </li>-->
          </ul>
        </nav>
      </div>
    </header>
    <aside class="sidebar" itemscope itemtype="http://schema.org/WPSideBar">
      <div class="slimContent">
        <div class="widget">
          <h3 class="widget-title">公告</h3>
          <div class="widget-body">
            <div id="board">
              <div class="content">{{notice.noticeContent}}个人知识星球，欢迎加入我们
                <!--  <a class="text-primary" href="https://163.lu/GTe6P3" target="_blank">https://163.lu/GTe6P3</a> 或者扫描以下二维码，并下载登录
                <div>
                  <img src="./images/xingqiu-qrcode.jpg" width="140" height="140">
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="widget">
          <h3 class="widget-title">分类</h3>
          <div class="widget-body">
            <ul class="category-list">
              <router-link tag="li" class="category-list-item" v-for="category in categoryList" :key="category.id" v-if="category.count>0"
                v-bind:to="'/blog/category/' + category.categoryName">
                <a class="category-list-link">{{category.categoryName}}</a>
                <span class="category-list-count">{{category.count}}</span>
              </router-link>

            </ul>
          </div>
        </div>
        <div class="widget">
          <h3 class="widget-title">标签</h3>
          <div class="widget-body">
            <ul class="tag-list">
              <router-link tag="li" class="tag-list-item" v-for="tag in tagList" :key="tag.id" v-if="tag.count>0" v-bind:to="'/blog/tag/' + tag.tagName">
                <a class="tag-list-link">{{tag.tagName}}</a>
                <span class="category-list-count">{{tag.count}}</span>
              </router-link>

            </ul>
          </div>
        </div>
        <div class="widget">
          <h3 class="widget-title">归档</h3>
          <div class="widget-body">
            <ul class="archive-list">
              <router-link v-bind:to=" month.dateStr|formatUrl" tag="li" class="archive-list-item" v-for="month in monthList" :key="month.dataStr">
                <a class="archive-list-link">{{month.dateStr}}</a>
                <span class="archive-list-count">{{month.count}}</span>
              </router-link>

            </ul>
          </div>
        </div>
        <!--  <div class="widget">
          <h3 class="widget-title">最新文章</h3>
          <div class="widget-body">
            <ul class="recent-post-list list-unstyled no-thumbnail">
              <li>
                <div class="item-inner">
                  <p class="item-category">
                    <a class="category-link" href="/categories/开发/">开发</a>
                  </p>
                  <p class="item-title">
                    <a href="/2018/03/28/那些有趣的注释，有没有你曾用过的.html" class="title">那些有趣的注释，有没有你曾用过的</a>
                  </p>
                  <p class="item-date">
                    <time datetime="2018-03-28T12:45:41.000Z" itemprop="datePublished">2018-03-28</time>
                  </p>
                </div>
              </li>
              <li>
                <div class="item-inner">
                  <p class="item-category">
                    <a class="category-link" href="/categories/个人/">个人</a>
                  </p>
                  <p class="item-title">
                    <a href="/2018/03/25/年后的状态，懒！.html" class="title">年后的状态，懒！</a>
                  </p>
                  <p class="item-date">
                    <time datetime="2018-03-25T06:59:41.000Z" itemprop="datePublished">2018-03-25</time>
                  </p>
                </div>
              </li>
              <li>
                <div class="item-inner">
                  <p class="item-category">
                    <a class="category-link" href="/categories/开发工具/">开发工具</a>
                  </p>
                  <p class="item-title">
                    <a href="/2017/12/17/visual-studio-code-personal-use-plug-in-colation.html" class="title">Visual Studio Code个人使用插件整理</a>
                  </p>
                  <p class="item-date">
                    <time datetime="2017-12-17T10:32:51.000Z" itemprop="datePublished">2017-12-17</time>
                  </p>
                </div>
              </li>
              <li>
                <div class="item-inner">
                  <p class="item-category"></p>
                  <p class="item-title">
                    <a href="/2017/11/01/hexo-blog-theme-pure-usage-description.html" class="title">Hexo博客主题pure使用说明</a>
                  </p>
                  <p class="item-date">
                    <time datetime="2017-11-01T13:45:08.000Z" itemprop="datePublished">2017-11-01</time>
                  </p>
                </div>
              </li>
              <li>
                <div class="item-inner">
                  <p class="item-category"></p>
                  <p class="item-title">
                    <a href="/2017/09/06/how-to-use-mathjax-to-render-latex-mathematical-formula-in-hexo.html" class="title">如何在Hexo中使用Mathjax渲染LaTeX数学公式</a>
                  </p>
                  <p class="item-date">
                    <time datetime="2017-09-06T01:19:34.000Z" itemprop="datePublished">2017-09-06</time>
                  </p>
                </div>
              </li>
            </ul>
          </div>
</div>-->
      </div>
    </aside>
    <main class="main" role="main">
      <router-view></router-view>
    </main>
    <footer class="footer" itemscope itemtype="http://schema.org/WPFooter">
      <ul class="social-links">
        <li>
          <a href="https://github.com/cofess" target="_blank" title="Github" data-toggle="tooltip" data-placement="top">
            <i class="icon icon-github"></i>
          </a>
        </li>
        <li>
          <a href="http://weibo.com/cofess" target="_blank" title="Weibo" data-toggle="tooltip" data-placement="top">
            <i class="icon icon-weibo"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/iwebued" target="_blank" title="Twitter" data-toggle="tooltip" data-placement="top">
            <i class="icon icon-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://www.behance.net/cofess" target="_blank" title="Behance" data-toggle="tooltip" data-placement="top">
            <i class="icon icon-behance"></i>
          </a>
        </li>
        <li>
          <a href="/atom.xml" target="_blank" title="Rss" data-toggle="tooltip" data-placement="top">
            <i class="icon icon-rss"></i>
          </a>
        </li>
      </ul>
      <!-- <div class="copyright">
        <div class="publishby">Theme by
          <a href="https://github.com/cofess" target="_blank">cofess </a>base on
          <a href="https://github.com/cofess/hexo-theme-pure" target="_blank">pure</a>.</div>
      </div> -->
    </footer>

  </div>
</template>
<script>
  import {
    findAllCategory,
    findAllTag,
    findNotice,
    findAllMonth
  } from '@/api/api'
  import './js/plugin.min.js'
  export default {
    data() {
      return {
        person: {
          name: "yukong",
          desc: "you need do batter",
          address: "Hangzhou,China"
        },
        tagList: [],
        categoryList: [],
        notice: {
          noticeContent: ""
        }, //todo 这里如何写
        monthList: []
      }
    },
    filters: {
      formatUrl(param) {
        return '/blog/archive/' + param.split("-").reverse().join("/");
      },
    },
    async created() {
      let tagRes = await findAllTag();
      this.tagList = tagRes.data;
      let categoryRes = await findAllCategory();
      this.categoryList = categoryRes.data;
      let noticeRes = await findNotice(); // todo 请求后台失败
      this.notice = noticeRes.data;
      let monthRes = await findAllMonth();
      this.monthList = monthRes.data;
    }
  }
</script>