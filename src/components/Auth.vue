<template>
  <div id="auth">
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="input-field col s6">
            <input id="name" type="text">
            <label for="name">name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="password" id="password">
            <label for="password">password</label>
          </div>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light" @click="login()">login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router.js'

export default {
  name: 'auth',
  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    async login() {
      router.push('room')
    }
  }
}
</script>