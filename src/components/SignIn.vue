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
          <div class="input-field col s6">
            <input type="password" id="password" v-model="password">
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
import Auth from '@aws-amplify/auth';

export default {
  name: 'sign-in',
  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    async login() {
      Auth.signIn(this.$data.username, this.$data.password)
        .then((success) => {
          console.log('successful sign in')
          router.push('room')
         }).catch(err => console.log(err))

    }
  }
}
</script>