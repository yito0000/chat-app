<template>
  <div id="sign-in">
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="input-field col s6">
            <input id="username" type="text" v-model="username">
            <label for="username">username</label>
          </div>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light" @click="login()">入室</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router.js'

export default {
  name: 'sign-in',
  data() {
    return {
      username: "",
    }
  },

  mounted() {
    if(localStorage.username) {
      router.push('/room')
    }

  },

  methods: {
    async login() {
      localStorage.username = this.$data.username
      router.push('room')
    }
  }
}
</script>