<template>
    <header>

    </header>
    <div class="login-container" v-loading="loading">
        <div>
            <h3>欢迎使用xChat</h3>
        </div>
        <div><el-button color="#626aef" @click="loginDialogVisible = true">登录/注册</el-button></div>
    </div>
    <div class="login">
        <el-dialog v-model="loginDialogVisible" title="登录" width="90%">
            <el-form :model="form" @keyup.enter.native="handleLogin">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
            </el-form>

            <div>
                <el-button @click="loginDialogVisible = false; registerDialogVisible = true;">注册新用户</el-button>
                <el-button id="login" color="#626aef" @click="handleLogin">登录</el-button>
            </div>

        </el-dialog>
    </div>

    <div class="register">
        <el-dialog v-model="registerDialogVisible" title="注册" width="90%">
            <el-form :model="form" @keyup.enter.native="handleRegister">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.password_comfirm" type="password" />
                </el-form-item>
            </el-form>

            <div>
                <el-button @click="registerDialogVisible = false; loginDialogVisible = true;">已有账号</el-button>
                <el-button id="login" color="#626aef" @click="handleRegister">注册</el-button>
            </div>

        </el-dialog>
    </div>


</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { login } from '../api/token'
import { register } from '../api/users'

const router = useRouter()

const loginDialogVisible = ref(false)
const registerDialogVisible = ref(false)
const loading = ref(false)

const form = reactive({
    email: '',
    password: '',
    password_comfirm: ''
})

async function handleLogin() {
    loginDialogVisible.value = false
    loading.value = true
    login(form.email, form.password).then(value => {
        loading.value = false
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        if (value.data.code == 200) {
            localStorage.setItem('token', value.data.data.token)
            router.push({ path: '/home' })
        }
    }).catch(function (error) {
        loading.value = false
        let err_msg = ''
        switch (error.response.status) {
            case 418:
                err_msg = '您的输入格式异常'
                break
            case 403:
                err_msg = '请输入正确的邮箱和密码'
                break
            default:
                err_msg = '网络请求错误'
                break;
        }
        ElMessage.error(err_msg)
    });
}

async function handleRegister() {
    registerDialogVisible.value = false
    loading.value = false
    register(form.email, form.password).then(value => {
        handleLogin().then(value => {
            loading.value = false
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
            if (value.data.code == 200) {
                localStorage.setItem('token', value.data.data.token)
                router.push({ path: '/home' })
            }
        }).catch(function (error) {
            loading.value = false
            let err_msg = ''
            switch (error.response.status) {
                case 418:
                    err_msg = '您的输入格式异常'
                    break
                case 403:
                    err_msg = '请输入正确的邮箱和密码'
                    break
                default:
                    err_msg = '网络请求错误'
                    break;
            }
            ElMessage.error(err_msg)
        });
    })
}

</script>
<style scoped>
.login-container {
    width: 200px;
    height: 100px;
    position: fixed;
    top: calc((100% - 100px) / 2);
    left: calc((100% - 200px) / 2);
    margin: auto;
    text-align: center;
}

#login {
    position: absolute;
    right: 32px;
}
</style>
