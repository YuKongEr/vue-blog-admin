<style lang="less" scoped>
  .category-page {
    background-color: #fff;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 10px;
    .category-header {

      margin-bottom: 10px;
    }
  }
</style>

<template>
  <Row class="category-page">
    <Row>
      <Col span="12" class="category-header">
      <Button type="info" icon="plus-round">添加</Button>
      <Button type="success" icon="refresh">刷新</Button>
      <Button type="primary" icon="ios-download ">导出</Button>

      </Col>
      <Col span="12" class="category-header">
      <Input v-model="query.categoryName" placeholder="请输入类目名称">
      <Button slot="append" icon="ios-search"></Button>
      </Input>
      </Col>

    </Row>
    <Table :loading="setting.loading" :border="setting.showBorder" :columns="columns " :data="data "></Table>
    <Col span="12" offset="12" class="category-page">
    <Page :total="page.total" :page-size="page.pageSize" show-elevator show-sizer :page-size-opts="page.pageSizeOpts" @on-change="currPageChange"
      @on-page-size-change="pageSizeChange"></Page>
    </Col>


  </Row>

</template>
<script>
  import {
    getCategoryPage
  } from '@/api/api'
  export default {
    data() {
      return {
        query: {
          categoryName: ""
        },
        setting: {
          loading: false,
          showBorder: true,

        },
        columns: [{
            title: 'id',
            key: 'id',
            sortable: true
          },
          {
            title: '类目名称',
            key: 'categoryName'
          },
          {
            title: '类目权值',
            key: 'categoryWeight',
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
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
                      this.openAddModal(params.row.id)
                    }
                  }
                }, '修改'), h('Button', {
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
    mounted() {
      this.getData();
    },
    methods: {
      /**
       * 获取分页数据
       */
      async getData() {
        let res = await getCategoryPage({
          currPage: this.page.currPage - 1,
          pageSize: this.page.pageSize
        })
        this.data = res.content;
        this.page.total = res.totalElements;

      },

      /**
       * 页码改变
       */
      currPageChange(currPage) {
        this.page.currPage = currPage;
        this.getData()
      },

      pageSizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getData();
      }


    }
  }
</script>