<template>
    <header>

    </header>
    <div class="login-container">
        <div>
            <h3>欢迎使用xChat</h3>
        </div>
        <div><el-button color="#626aef" @click="dialogVisible = true">登录/注册</el-button></div>
    </div>
    <div class="login">
        <el-dialog v-model="dialogVisible" title="登录/注册" width="90%">
            <el-form :model="form" @keyup.enter.native="handleLogin">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="用户不存在时将自动注册" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
            </el-form>

            <div>
                <el-button @click="handleRegister">注册新用户</el-button>
                <el-button id="login" color="#626aef" @click="handleLogin">登录</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '../api/token'
import { register } from '../api/users'

const router = useRouter()

const dialogVisible = ref(false)

const form = reactive({
    email: '',
    password: ''
})

async function handleLogin() {
    dialogVisible.value = false
    login(form.email, form.password).then(value => {
        if (value.data.code == 200) {
            localStorage.setItem('token', value.data.data.token)
            router.push({ path: '/home' })
        }
    })
}

async function handleRegister() {
    dialogVisible.value = false
    register(form.email, form.password).then(value => {
        handleLogin().then(value => {
            if (value.data.code == 200) {
                localStorage.setItem('token', value.data.data.token)
                router.push({ path: '/home' })
            }
        })
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
