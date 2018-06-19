<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long :loading="loadding">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import {
        requestLogin
    } from '@/api/api.js'
    export default {
        data() {
            return {
                loadding:false,
                form: {
                    userName: 'yukong',
                    password: ''
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    this.loadding = true;
                    if (valid) {


                        requestLogin({
                            'userName': this.form.userName,
                            'userPwd': this.form.password
                        }).then((res) => {
                            if (res.data.code ==
                                1) {
                                Cookies.set("token", res.headers.authorization);
                                Cookies.set('user', this.form.userName);
                                Cookies.set('password', this.form.password);
                                this.$store.commit('setAvator',
                                    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                                );
                                if (this.form.userName === 'iview_admin') {
                                    Cookies.set('access', 0);
                                } else {
                                    Cookies.set('access', 1);
                                }
                                this.loadding = false;
                                this.$router.push({
                                    name: 'home_index'
                                });
                            } else if (res.data.code == -1) {

                                this.$Notice.error({
                                    title: '用户名或者密码错误',
                                    duration: 2
                                });

                            }
                        })



                    }
                });
            }
        }
    };
</script>

<style>
</style>