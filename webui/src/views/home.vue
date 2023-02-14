<template>
    <div class="chat-container">
        <ul class="infinite-list" style="overflow: auto">
            <li v-for="i in msg_list" :key="i" class="infinite-list-item">
                <div class="msg msg-sender" v-if="i.sender">{{ i.msg }}</div>
                <div class="msg msg-bot" v-else>{{ i.msg }}</div>
            </li>
        </ul>
        <div class="chat-input">
            <el-input v-model="msg" placeholder="" />
        </div>
        <div class="chat-enter">
            <el-button color="#626aef" @click="handleSendMsg">发送</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { send } from '../api/messages'
const router = useRouter()
const msg = ref('')
// const msg_list = reactive([
//     { sender: 1, msg: 'Hello' },
//     { sender: 0, msg: 'Hello, I\'m ChatBot' },
//     { sender: 1, msg: 'Nice to see u' },
//     { sender: 0, msg: 'Nice to see u,too' },
//     { sender: 1, msg: 'How are u' },
//     { sender: 0, msg: 'Fine, thank you' }
// ]) //0是Bot 1是自己
const msg_list = reactive([]);

function add_msg(sender, msg) {
    msg_list.push({
        sender,
        msg
    })
}

async function handleSendMsg() {
    add_msg(1, msg.value)
    send(msg.value).then(value => {
        console.log(value)
        add_msg(0, value.data.data.msg)
    })
}

</script>

<style>
.chat-container {
    position: fixed;
    width: 97%;
    height: 97%;
    left: calc((100% - 97%) / 2);
    top: calc((100% - 97%) / 2);
    margin: auto;
    text-align: center;
    border: 2px solid var(--el-border-color);
    border-radius: 4px
}

.chat-input {
    left: 2%;
    width: 80%;
    position: absolute;
    bottom: 10px;
}

.chat-enter {
    position: absolute;
    bottom: 10px;
    right: 0;
    width: 18%;
}

.infinite-list {
    height: 80%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    height: 50px;
    /* background: var(--el-color-primary-light-9); */
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.msg {
    color: black;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--el-border-color);
    border-radius: 4px
}

.msg-sender {
    margin-left: auto;
    background-color: #626aef;
}

.msg-bot {
    background-color: darkgray;
}
</style>