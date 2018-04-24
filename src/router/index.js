import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve) // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/markdown',
                    // component: resolve => require(['../components/page/Markdown.vue'], resolve) // Vue-Quill-Editor组件
                    component: resolve => require(['../components/page/writeBlog.vue'], resolve)
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
                },

                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve) // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
