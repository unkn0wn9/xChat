<template>
    <div class="chat-header">
        <el-row class="chat-header-row">
            <el-col :span="8">
                <el-button link @click="handleLogout" style="padding-left:4%;">
                    <el-icon size="20" color="#626aef">
                        <Back />
                    </el-icon>
                </el-button>
            </el-col>
            <el-col :span="8" style="text-align:center;">
                <span><strong>{{ bot_name }}</strong></span>
            </el-col>
        </el-row>
    </div>
    <div class="chat-container">
        <el-scrollbar ref="scrollbarRef" class="infinite-list">
            <div v-for="i in msg_list" class="infinite-list-item">
                <div class="msg msg-sender" v-if="i.sender == 1">{{ i.msg }}</div>
                <div class="msg msg-bot" v-else-if="i.sender == 0">{{ i.msg }}</div>
                <div class="msg msg-bot" v-else-if="i.sender == 2">
                    <p>您的Token使用超额,请点击<a href="">购卡</a>并<span style="color: blue;" @click="router.push({ path: '/card' })">充值</span></p>
                </div>
            </div>
        </el-scrollbar>

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

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { ElScrollbar } from 'element-plus'
import { Back } from '@element-plus/icons-vue'

import { site_name, bot_name } from '../api/config'

import { send } from '../api/messages'

const router = useRouter()
const msg = ref('')
const msg_list = reactive([ // 0是Bot发送 1是用户发送 2是支付
    { sender: 0, msg: `你好,我是来自${site_name}的${bot_name},欢迎向我提问!` }
]);

const loading = ref(false)
const logoutDialogVisible = ref(false)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

function add_msg(sender, msg) {
    msg_list.push({
        sender,
        msg,
    })
}

async function handleSendMsg() {
    let buf = msg.value
    loading.value = true
    msg.value = ''
    add_msg(1, buf)
    if (scrollbarRef.value!.wrapRef) {
        scrollbarRef.value!.setScrollTop(scrollbarRef.value!.wrapRef.scrollHeight)
    }
    send(buf).then(value => {
        loading.value = false
        let tmp_msg = value.data.data.msg
        if ('您的Token使用超额,请联系管理员' == tmp_msg.trim()) {
            add_msg(2, tmp_msg)
        } else {
            add_msg(0, tmp_msg)
        }
        if (scrollbarRef.value!.wrapRef) {
            scrollbarRef.value!.setScrollTop(scrollbarRef.value!.wrapRef.scrollHeight)
        }
    }).catch(err => {
        console.log(err)
    })
}

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('token_expired_at')
    router.push({ path: '/login' })
}

function handleLogout() {
    logoutDialogVisible.value = true
}

</script>

<style>
.chat-header {
    position: fixed;
    width: 100%;
    height: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    /* text-align: center; */
    z-index: 100;
}

.chat-header-row {
    width: calc(100% - 20px);
    height: 30px;
    left: 0;
    font-size: 18px;
}

.chat-container {
    position: fixed;
    width: 98%;
    height: 98%;
    left: calc((100% - 98%) / 2);
    top: calc((100% - 98%) / 2);
    margin: auto;
    border: 1px solid var(--el-border-color);
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
    white-space: pre-wrap;
}

.msg-sender {
    margin-left: auto;
    background-color: #edfeda;
}

.msg-bot {
    background-color: #fefefe;
}

.infinite-list {
    position: relative;
    top: 30px;
    height: calc(100% - 30px - 30px - 10px) !important;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    min-height: 50px;
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