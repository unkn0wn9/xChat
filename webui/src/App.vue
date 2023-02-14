<template>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    let token = localStorage.getItem('token')
    if (token) {
      router.push({ name: 'home' })
    }else{
      router.push({ name: 'login' })
    }
  },
}
</script>