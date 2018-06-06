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
      <Button type="info" icon="plus-round" :disabled="setting.loading" @click="show =true ">添加</Button>
      <Button type="success" :disabled="setting.loading" icon="refresh" @click="doRefresh">刷新</Button>
      <Button type="primary" icon="ios-download " @click="exportData(1)">导出</Button>

      </Col>
      <Col span="12" class="category-header">
      <Input v-model="query.categoryName" placeholder="请输入类目名称">
      <Button slot="append" icon="ios-search" @click="getData"></Button>
      </Input>
      </Col>

    </Row>
    <Table :loading="setting.loading" :border="setting.showBorder" :columns="columns " :data="data" ref="table"></Table>
    <Col span="12" offset="12" class="category-page">
    <Page :total="page.total" :page-size="page.pageSize" show-elevator show-sizer :page-size-opts="page.pageSizeOpts" @on-change="currPageChange"
      @on-page-size-change="pageSizeChange"></Page>
    </Col>


    <Modal v-model="show" title="添加博客类目" :mask-closable="false" :closable="false">
      <Form ref="modalForm" :model="form" :rules="ruls" :label-width="80">
        <FormItem label="类目名称" prop="categoryName">
          <Input v-model.trim="form.categoryName"></Input>
        </FormItem>
        <FormItem label="类目权值" prop="categoryWeight">
          <InputNumber v-model="form.categoryWeight"></InputNumber>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button type="default" :disabled="formSetting.loading" @click="show=false">取消</Button>
        <Button type="primary" :loading="formSetting.loading" @click="addCategory">确定</Button>
      </div>
    </Modal>



    <Modal v-model="updateShow" title="修改博客类目" :mask-closable="false" :closable="false">
      <Form ref="updateForm" :model="updateForm" :rules="ruls" :label-width="80">
        <FormItem label="类目id" prop="categoryName">
          <Input v-model.trim="updateForm.id" disabled></Input>
        </FormItem>
        <FormItem label="类目名称" prop="categoryName">
          <Input v-model.trim="updateForm.categoryName"></Input>
        </FormItem>
        <FormItem label="类目权值" prop="categoryWeight">
          <InputNumber v-model="updateForm.categoryWeight"></InputNumber>
        </FormItem>
        <FormItem label="修改时间" prop="modifyTime">
          <Input v-bind:value="updateForm.modifyTime | formateDate" disabled></Input>
        </FormItem>
        <FormItem label="创建时间" prop="createTime">
          <Input v-bind:value="updateForm.createTime | formateDate" disabled></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" :disabled="updateSetting.loading" @click="updateShow=false">取消</Button>
        <Button type="primary" :loading="updateSetting.loading" @click="addCategory">确定</Button>
      </div>
    </Modal>
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
  import {
    getCategoryPage,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
  } from '@/api/api'
  import dayjs from 'dayjs'
  export default {
    data() {
      return {
        removeObject: {},
        removeModal: false,
        updateShow: false,
        updateForm: {

        },
        updateSetting: {
          loading: false
        },
        show: false,
        form: {
          categoryName: "",
          categoryWeight: 0
        },
        ruls: {
          categoryName: [{
            required: true,
            message: "请填写博客类目"
          }],
          categoryWeight: [{
            required: true,
            message: "请填写博客权值"
          }]
        },
        formSetting: {
          loading: false
        },
        query: {
          categoryName: ""
        },
        setting: {
          loading: true,
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
                      this.openUpdateModal(params.row.id)
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
        this.setting.loading = true;
        let res = await getCategoryPage({
          currPage: this.page.currPage - 1,
          pageSize: this.page.pageSize,
          categoryName: this.query.categoryName
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
      /**
       * 添加博客类目
       */
      async addCategory() {
        this.$refs.modalForm.validate(valid => {
          if (valid) {
            this.add();
          }
        });
      },
      doRefresh() {
        this.getData();
      },
      /**
       * 发送添加请求
       */
      async add() {
        this.formSetting.loading = true;
        let res = await addCategory(this.form);

        if (res.data.code == 1) {
          this.$Message.success("博客类目" + this.form.categoryName +
            " 添加成功");
          this.show = false;
          this.getData();
        } else {
          this.$Message.error("博客类目" + this.form.categoryName + " 添加失败");
        }
        this.formSetting.loading = false;
      },
      /** 
       * @description 
       * 导出表格CSV 
       **/
      exportData(type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '博客类目数据-' + new Date().getTime(),
            columns: this.columns.filter((col, index) => index > 0 && index < this.columns.length - 1),
            data: this.data
          });
        }
      },
      /**
       * 打开修改框
       */
      async openUpdateModal(id) {
        let res = await getCategoryById(id);
        Object.assign(this.updateForm, res.data);
        this.updateShow = true;
      },
      /**
       * 更新博客类目
       **/
      async addCategory() {
        this.$refs.updateForm.validate(valid => {
          if (valid) {
            this.update();
          }
        });
      },
      /**
       * 更新
       */
      async update() {
        this.updateSetting.loading = true;
        let res = await updateCategory(this.updateForm);
        if (res.code == 1) {
          this.$Message.success("博客类目" + this.updateForm.categoryName + " 更新成功");
          this.updateShow = false;
          this.getData();
        } else {
          this.$Message.error("博客类目" + this.updateForm.categoryName + " 更新失败");
        }
        this.updateSetting.loading = false;
      },
      /**
       * 删除
       */
      async remove() {
        this.removeModal = false;
        if (this.removeObject == null) {
          this.$Message.warning("删除对象为空，无法继续执行！");
          return false;
        }
        this.setting.loading = true;
        try {
          let res = await deleteCategory(this.removeObject.obj.id);
          this.$Message.success("删除成功");
          this.data.splice(this.removeObject.index, 1);
        } catch (error) {
          this.$throw(error)
        }
        this.setting.loading = false;
      }
    }
  }
</script>