<template>
  <div>

    <div class="content" style="    margin-bottom: 50px;">
      <article id="post-hexo-builds-a-personal-blog-and-deploys-to-github" class="article article-type-post" itemscope itemtype="http://schema.org/BlogPosting">
        <div class="article-header">
          <h1 class="article-title" itemprop="name" style="margin-top: 0;">{{article.articleTitle}}</h1>
          <div class="article-meta">
            <span class="article-date">
              <i class="icon icon-calendar-check"></i>
              <a href="/2017/04/09/hexo-builds-a-personal-blog-and-deploys-to-github.html" class="article-date">
                <time v-bind:datetime="article.publishaTime " itemprop="datePublished">{{article.publishTime | formatDate}}</time>
              </a>
            </span>
            <router-link tag="span" class="article-category" v-bind:to="'/blog/category/' + article.category.categoryName">
              <i class="icon icon-folder"></i>
              <a class="article-category-link">{{article.category.categoryName}}</a>
            </router-link>
            <span class="article-tag" v-for="tag in article.tags" :key="tag.id">
              <i class="icon icon-tags"></i>
              <a class="article-tag-link" href="/tags/Github/">{{tag.tagName}}</a>
            </span>
            <span class="post-comment">
              <i class="icon icon-comment"></i>
              <a href="/2017/04/09/hexo-builds-a-personal-blog-and-deploys-to-github.html#comments" class="article-comment-link">评论</a>
            </span>

          </div>
        </div>
        <div class="article-entry markdown-body" itemprop="articleBody" v-html="compiledMarkdown">

        </div>
        <div class="article-footer">
          <blockquote class="mt-2x">
            <ul class="post-copyright list-unstyled">
              <li class="post-copyright-link hidden-xs">
                <!--  <strong>本文链接：</strong>
                <a href="http://blog.cofess.com/2017/04/09/hexo-builds-a-personal-blog-and-deploys-to-github.html" title="Hexo搭建个人博客并部署到Github"
                  target="_blank" rel="external">http://blog.cofess.com/2017/04/09/hexo-builds-a-personal-blog-and-deploys-to-github.html</a>-->
              </li>
              <li class="post-copyright-license">
                <strong>版权声明： </strong>本博客所有文章除特别声明外，均采用
                <a href="http://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank" rel="external">CC BY 4.0 CN协议</a> 许可协议。转载请注明出处！</li>
            </ul>
          </blockquote>
          <div class="panel panel-default panel-badger">
            <div class="panel-body">
              <figure class="media">
                <div class="media-left">
                  <a href="https://github.com/cofess" target="_blank" class="img-burn thumb-sm visible-lg">
                    <img src="./images/avatar.jpg" class="img-rounded w-full" alt="">
                  </a>
                </div>
                <div class="media-body">
                  <h3 class="media-heading">
                    <a href="https://github.com/cofess" target="_blank">
                      <span class="text-dark">Yukong</span>
                      <small class="ml-1x">Web Developer &amp; Coder</small>
                    </a>
                  </h3>
                  <div>喜欢新事物，关注前端动态，对新的技术有追求；喜欢 coding。</div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </article>
      <section id="comments">
        <div id="lv-container" data-id="city" data-uid="MTAyMC8zMDE4OC82NzQz">
          <noscript>为正常使用来必力评论功能请激活JavaScript</noscript>
        </div>
      </section>
    </div>
    <nav class="bar bar-footer clearfix sticky-bottom" style="position: absolute;position: fixed; width: 680px; height: 52px; z-index: 42; bottom:0; "
      data-stick-bottom>
      <div class="bar-inner">
        <ul class="pager pull-left">
          <li class="prev">
            <a href="/2017/08/06/gulp-comon-plug-in-colation.html" title="gulp常用插件整理">
              <i class="icon icon-angle-left" aria-hidden="true"></i>
              <span>&nbsp;&nbsp;上一篇</span>
            </a>
          </li>

        </ul>
        <button type="button" class="btn btn-fancy btn-donate pop-onhover bg-gradient-warning" data-toggle="modal" data-target="#donateModal">
          <span>赏</span>
        </button>
        <div class="bar-right">
          <div class="share-component" data-sites="weibo,qq,wechat,facebook,twitter" data-mobile-sites="weibo,qq,qzone"></div>
        </div>
      </div>
    </nav>
    <div class="modal modal-center modal-small modal-xs-full fade" id="donateModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content donate">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body">
            <div class="donate-box">
              <div class="donate-head">
                <p>感谢您的支持，我会继续努力的!</p>
              </div>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade active in" id="alipay">
                  <div class="donate-payimg">
                    <img src="./images/donate/alipayimg.png" alt="扫码支持" title="扫一扫">
                  </div>
                  <p class="text-muted mv">扫码打赏，你说多少就多少</p>
                  <p class="text-grey">打开支付宝扫一扫，即可进行扫码打赏哦</p>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="wechatpay">
                  <div class="donate-payimg">
                    <img src="./images/donate/wechatpayimg.png" alt="扫码支持" title="扫一扫">
                  </div>
                  <p class="text-muted mv">扫码打赏，你说多少就多少</p>
                  <p class="text-grey">打开微信扫一扫，即可进行扫码打赏哦</p>
                </div>
              </div>
              <div class="donate-footer">
                <ul class="nav nav-tabs nav-justified" role="tablist">
                  <li role="presentation" class="active">
                    <a href="#alipay" id="alipay-tab" role="tab" data-toggle="tab" aria-controls="alipay" aria-expanded="true">
                      <i class="icon icon-alipay"></i> 支付宝</a>
                  </li>
                  <li role="presentation">
                    <a href="#wechatpay" role="tab" id="wechatpay-tab" data-toggle="tab" aria-controls="wechatpay" aria-expanded="false">
                      <i class="icon icon-wepay"></i> 微信支付</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
  import './js/plugin.min.js'

  import marked from 'marked'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/arta.css'
  import {
    getFrontArticleById
  } from '@/api/api'
  import {
    formatDate
  } from "@/config/mUtils";
  export default {
    data() {
      return {
        article: {

          articleTitle: "",
          articleContent: "",
          publishTime: new Date(),
          tags: [],
          category: {}
        }
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.article.articleContent || '')
      }
    },

    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },
    created() {
      this.getData();
      this.markdown();

    },
    methods: {
      markdown() {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          sanitize: true,
          smartypants: false,
          highlight: function (code, lang) {
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(lang, code, true).value;
            } else {
              return hljs.highlightAuto(code).value;
            }
          }
        })
      },
      async getData() {

        let res = await getFrontArticleById(this.$route.params.id);
        Object.assign(this.article, res.data);
        console.log(this.article);

      }
    }
  }
</script>
<style lang="less" scoped>
</style>