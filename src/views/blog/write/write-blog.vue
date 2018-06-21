<style lang="less">
  @import "../../../styles/common.less";
  .title,
  .tag {
    margin-bottom: 20px;
    z-index: 10000;
  }

  .my-tag {
    height: 50px;
    line-height: 50px;
    padding: 0;
    padding-left: 7px;
    padding-right: 7px;
  }

  .sred {
    color: red;
  }

  .sgreen {
    color: green;
  }
</style>


<template>
  <div>
    <Row class="margin-top-20">
      <Col span="20" offset="2">
      <div class="markdown-con">
        <Card>
          <Row>
            <Input v-model="title" placeholder="请输入标题" style="width:100%" class="title">
            <span slot="prepend">标题：</span>
            </Input>
          </Row>
          <Row class="tag">
            <Col span="6">
            <Select v-model="categoryData" style="width:200px;">
              <Option v-for="item in categoryOptions" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
            </Select>
            </Col>
            <Col offset="1" span="17">
            <Select v-model="tagData" multiple filterable remote :remote-method="remoteMethod" :loading="loading">
              <Option v-for="(option, index) in options" :value="option.id" :key="option.id">{{option.tagName}}</Option>
            </Select>
            </Col>
          </Row>
          <mavon-editor v-model="content" :toolbars="toolbars" :codeStyle="'monokai-sublime'" style="height:490px;margin-bottom:50px;"
          />
          <Affix :offset-bottom="20">
            <span style=" right:260px;position: absolute;bottom:20px; ">当前状态:
              <span :class="isPushlish?'sgreen':'sred'">{{publishStr}}</span>
            </span>
            <Button type="error" @click="draft" style=" right:110px;position: absolute;bottom:20px; ">存为草稿</Button>
            <Button type="primary" @click="publish" style=" right:50px;position: absolute;bottom:20px; ">发布</Button>

          </Affix>
        </Card>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {
    getTagPage,
    getCategoryPage,
    addArticle,
    getFrontArticleById
  } from "@/api/api";
  export default {
    data: function () {
      return {
        title: "",
        categoryData: [],
        categoryOptions: [],
        tagData: [],
        loading: false,
        options: [],
        articleStatus: -1,
        id: "",
        content: "",
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true // 预览
        }
      };
    },
    async mounted() {
      this.init();
    },
    computed: {
      isPushlish() {
        if (this.articleStatus == 1) {
          return true;
        } else {
          return false;
        }
      },
      publishStr() {
        if (this.articleStatus == 1) {
          return "发布";
        } else if (this.articleStatus == 0) {
          return "草稿";
        }
      }
    },
    methods: {
      async init() {
        let id = this.$route.params.id;
        let res = await getCategoryPage({
          currPage: 0,
          pageSize: 9999
        });
        this.categoryOptions = res.content;
        if (id != undefined && id != "") {
          let articleRes = await getFrontArticleById(id);
          articleRes = articleRes.data;
          this.id = articleRes.id;
          this.title = articleRes.articleTitle;
          this.content = articleRes.articleContent;
          this.categoryData = articleRes.category.id;
          this.tagData = this.transferTagObj2Array(articleRes.tags);
          this.options = articleRes.tags;
          this.articleStatus = articleRes.articleStatus;
        }
      },
      async remoteMethod(query) {
        if (query !== "") {
          this.loading = true;
          let res = await getTagPage({
            currPage: 0,
            pageSize: 9999,
            tagName: query
          });
          this.loading = false;
          this.options = res.content;
        } else {
          this.options = [];
        }
      },
      publish() {
        if (this.title == "") {
          this.$Message.error("博客标题不能为空！");
          return;
        }
        if (this.categoryData == "") {
          this.$Message.error("博客类别不能为空！");
          return;
        }
        if (this.tagData.length <= 0) {
          this.$Message.error("博客标签不能为空！");
          return;
        }
        if (this.content == "") {
          this.$Message.error("博客正文不能为空！");
          return;
        }
        this.articleStatus = 1;
        this.save("发布");
      },

      draft() {
        if (this.title == "") {
          this.$Message.error("博客标题不能为空！");
          return;
        }
        if (this.categoryData == "") {
          this.$Message.error("博客类别不能为空！");
          return;
        }
        if (this.tagData.length <= 0) {
          this.$Message.error("博客标签不能为空！");
          return;
        }
        if (this.content == "") {
          this.$Message.error(
            "博客正文不能为空！");
          return;
        }
        this.articleStatus = 0;
        this.save("保存");
      },

      async save(str) {
        this.loading = true;
        let article = {};
        article.articleTitle = this.title;
        article.categoryId = this.categoryData;
        article.tagIds = this.tagData;
        article.articleContent = this.content;
        article.articleStatus = this.articleStatus;
        article.id = this.id;
        let res = await addArticle(article);
        if (res.data.code == 1) {
          this.$Message.success("博客" + article.articleTitle + " " + str + "成功");
          this.loading = false;
        } else {
          this.$Message.error("博客" + article.articleTitle + " " + str + "失败");
        }
      },

      transferTagObj2Array(tags) {
        let ids = new Array();
        tags.forEach(element => {
          ids.push(element.id);
        });
        return ids;
      }
    }
  };
</script>