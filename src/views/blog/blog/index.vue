<template>
    <Row class="blog-page">
    <Row>
      <Col span="12" class="blog-header">
      <Button type="success" :disabled="setting.loading" icon="refresh" @click="doRefresh">刷新</Button>

      </Col>
      <Col span="12" class="blog-header">
      <Input v-model="query.articleTitle" placeholder="请输入博客名称">
      <Button slot="append" icon="ios-search" @click="getData"></Button>
      </Input>
      </Col>

    </Row>
    <Table :loading="setting.loading" :border="setting.showBorder" :columns="columns " :data="data" ref="table"></Table>
    <Col span="12" offset="12" class="blog-page">
    <Page :total="page.total" :page-size="page.pageSize" show-elevator show-sizer :page-size-opts="page.pageSizeOpts" @on-change="currPageChange"
      @on-page-size-change="pageSizeChange"></Page>
    </Col>


   
    <Modal v-model="removeModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>此操作为不可逆操作，是否确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="setting.loading" @click="remove">确认删除</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import {getArticlePage} from '@/api/api'
import dayjs from 'dayjs'
export default {
    data(){
        return {
            removeModal:false,
            query:{
                articleTitle:""
            },
            setting:{
                loading:false,
                showBorder:true
            }, columns: [{
            title: 'id',
            key: 'id',
            sortable: true
          },
          {
            title: '博客标题',
            key: 'articleTitle'
          },
          {
            title: '博客类别',
            key: 'category',
            render: (h, params) => {
              return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder'
                                    }
                                }),
                                h('strong', '  '+params.row.category.categoryName)
                    ]);
            }
            
          },
          {
            title: '博客状态',
            key: 'articleStatus',
             render:(h,params) => {
                return h('span',
                    {
                        style: {color: params.row.articleStatus == 1 ? 'green' : 'red'
                    }
                }, params.row.articleStatus == 1 ? '发布' : '草稿')
            },
            sortable: true
          },
          {
            title: '发布时间',
            key: 'publishTime',
            render: (h, params) => {
              return h('span', dayjs(params.row.modifyTime).format('YYYY年MM月DD日 HH:mm:ss'))
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openModifyBlog(params.row.id)
                    }
                  }
                }, '修改'),
                 h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeObject = {
                        obj: params.row,
                        index: params.index
                      }
                      this.removeModal = true;
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [],
        page: {
          total: 0,
          pageSizeOpts: [5, 10, 15, 20],
          pageSize: 5,
          currPage: 1
        }
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async getData(){
            this.setting.loading = true;
            let res = await getArticlePage({
            currPage: this.page.currPage - 1,
            pageSize: this.page.pageSize,
            articleTitle: this.query.articleTitle
            })
            this.data = res.content;
            this.page.total = res.totalElements;
            this.setting.loading = false;
        },
        /**
        * 页码改变
        */
        currPageChange(currPage) {
          this.page.currPage = currPage;
          this.getData()
        },

        /**
        * pageSize改变
        */
        pageSizeChange(pageSize) {
          this.page.pageSize = pageSize;
          this.getData();
        },
        doRefresh() {
        this.getData();
        },
        remove(){},
        renderTags(tags){
          console.log(tags);
          return tags.length;
        },
        openModifyBlog(id){
            this.$router.push({path:'/write-blog/index/' + id});
        }
    }
}
</script>
<style lang="less" scoped>
 .blog-page {
    background-color: #fff;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 10px;
    .blog-header {

      margin-bottom: 10px;
    }
  }
</style>
