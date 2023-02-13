<script setup>

</script>

<template>
  <header>

  </header>

  <div id="main">
    <h3>欢迎使用xChat</h3>
    <el-button color="#626aef" @click="dialogVisible = true">登录/注册</el-button>
    <el-dialog v-model="dialogVisible" title="登录/注册" width="30%">
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

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

const form = reactive({
  email:'',
  password:''
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

#main {
  text-align: center;
}
</style>
