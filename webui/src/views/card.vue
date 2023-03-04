<template>
    <header>
    </header>
    <el-form :model="form" @keyup.enter.native="handleRecharge">
        <el-form-item label="卡密">
            <el-input v-model="form.key" placeholder="请输入卡密" />
        </el-form-item>
        <div style="text-align:center ;"><el-button color="#626aef" @click="handleRecharge">充值到当前账号</el-button></div>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { recharge } from '../api/card'

const router = useRouter()

const loading = ref(false)

const form = reactive({
    key: ''
})

async function handleRecharge() {
    recharge(form.key).then(value => {
        ElMessage({
            message: '充值成功',
            type: 'success',
        })
        router.back()
    }).catch(function (error) {
        loading.value = false
        let err_msg = ''
        switch (error.response.status) {
            case 418:
                err_msg = '您的输入格式异常'
                break
            case 403:
                err_msg = '请输入卡密'
                break
            default:
                err_msg = '网络请求错误'
                break;
        }
        ElMessage.error(err_msg)
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
