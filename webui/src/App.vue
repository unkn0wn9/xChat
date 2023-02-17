<template>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    let token = localStorage.getItem('token')
    let expired_at = localStorage.getItem('token_expired_at')
    let now = new Date().getTime()
    if (now > expired_at) {
      localStorage.removeItem('token')
      localStorage.removeItem('token_expired_at')
      token = null
    }
    if (token) {
      router.push({ name: 'home' })
    } else {
      router.push({ name: 'login' })
    }
  },
}
</script>