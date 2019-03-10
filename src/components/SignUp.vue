<template>
  <div id="sign-up">
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="input-field col s6">
            <input id="email" type="email" v-model="email">
            <label for="email">email</label>
          </div>
        </div>
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
          <button class="btn waves-effect waves-light" @click="signUp()">sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router.js'
import Auth from '@aws-amplify/auth';

export default {
  name: 'sign-up',
  data() {
    return {
      email: "",
      username: "",
      password: "",
    }
  },

  methods: {
    async signUp() {
      const email = this.$data.email
      const username = this.$data.username
      const password = this.$data.password
      Auth.signUp({
        username,
        password,
        attributes: {
          email
        },
      }).then((success) => {
        console.log('successful sign in')
      }).catch(err => console.log(err))
    }
  }
}

</script>