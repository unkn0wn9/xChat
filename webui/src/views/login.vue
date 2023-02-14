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
        <el-dialog v-model="dialogVisible" @click="handleLogin" title="登录/注册" width="100%">
            <el-form :model="form">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="用户不存在时将自动注册" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button color="#626aef" @click="dialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useRequest } from 'vue-request';
import { login } from '../api/token';
import { useRouter } from 'vue-router'
const router = useRouter()

const dialogVisible = ref(false)

const form = reactive({
    email: '',
    password: ''
})

async function handleLogin() {
    login(form.email, form.password).then(value => {
        if (value.data.code == 200) {
            localStorage.setItem('token', value.data.data.token)
            router.push({ path: '/home' })
        }
    })
}

</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.login-container {
    width: 200px;
    height: 100px;
    position: fixed;
    top: calc((100% - 100px) / 2);
    left: calc((100% - 200px) / 2);
    margin: auto;
    text-align: center;
}
</style>
