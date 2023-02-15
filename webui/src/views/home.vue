<template>
    <div class="chat-header">
        <el-row :gutter="20" style="height:100%">
            <el-col :span="8" style="padding-left: 5%">
                <el-button key="plain" type="primary" link @click="handleLogout">
                    <el-icon size="30" color="#626aef">
                        <Back />
                    </el-icon>
                </el-button>
            </el-col>
            <el-col :span="8" style="text-align: center;padding-top: 7px;">
                <span><strong>xChat</strong></span>
            </el-col>
            <el-col :span="8">
                <div class="grid-content ep-bg-purple" />
            </el-col>
        </el-row>
    </div>
    <div class="chat-container">
        <ul class="infinite-list" style="overflow: auto">
            <li v-for="i in msg_list" :key="i" class="infinite-list-item">
                <div class="msg msg-sender" v-if="i.sender">{{ i.msg }}</div>
                <div class="msg msg-bot" v-else>{{ i.msg }}</div>
            </li>
        </ul>
        <div class="input-container">
            <div class="chat-input">
                <el-input v-loading="loading" v-model="msg" placeholder="" @keyup.enter.native="handleSendMsg" />
            </div>
            <div class="chat-enter">
                <el-button class="enter-button" color="#626aef" @click="handleSendMsg">发送</el-button>
            </div>
        </div>
    </div>
    <el-dialog v-model="logoutDialogVisible" title="退出" width="90%">
        <span>确定退出吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="logoutDialogVisible = false">取消</el-button>
                <el-button id="logout" color="#626aef" @click="logout">退出</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
    Back
} from '@element-plus/icons-vue'

import { send } from '../api/messages'

const router = useRouter()
const msg = ref('')
const msg_list = reactive([ // 0是Bot发送 1是用户发送
    { sender: 0, msg: '你好,我是xChat机器人,欢迎向我提问！' }
]);

const loading = ref(false)
const logoutDialogVisible = ref(false)

function add_msg(sender, msg) {
    msg_list.push({
        sender,
        msg
    })
}

async function handleSendMsg() {
    let buf = msg.value
    loading.value = true
    msg.value = ''
    add_msg(1, buf)
    send(buf).then(value => {
        loading.value = false
        add_msg(0, value.data.data.msg)
    })
}

function logout() {
    localStorage.removeItem('token')
    router.push({ path: '/login' })
}

function handleLogout() {
    logoutDialogVisible.value = true
}

</script>

<style>
.chat-header {
    position: fixed;
    top: 3%;
    width: 100%;
    height: 30px;
}

.chat-container {
    position: fixed;
    width: 97%;
    height: 97%;
    left: calc((100% - 97%) / 2);
    top: calc((100% - 97%) / 2);
    margin: auto;
    border: 2px solid var(--el-border-color);
    border-radius: 4px
}

.msg {
    color: black;
    /* width: 70%; */
    max-width: 70%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    border: 2px solid var(--el-border-color);
    border-radius: 4px;
    padding: 10px;
}

.msg-sender {
    margin-left: auto;
    background-color: #edfeda;
}

.msg-bot {
    background-color: #fefefe;
}

.infinite-list {
    height: 90%;
    padding: 0;
    margin: 0;
    padding-top: 35px !important;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    min-height: 50px;
    /* background: var(--el-color-primary-light-9); */
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.infinite-list {
    height: 90%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    min-height: 50px;
    /* background: var(--el-color-primary-light-9); */
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.input-container {
    height: 30px;
    width: 100%;
    position: fixed;
    bottom: 2%;
}

.chat-input {
    left: 2%;
    width: 78%;
    position: absolute;
}

.chat-enter {
    position: absolute;
    right: 2%;
    width: 16%;
}

.enter-button {
    width: 80% !important;
}
</style>