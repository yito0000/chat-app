<template>
  <div id="confirm-code">
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col s6">
            <label for="username">username</label>
            <input id="username" type="text" v-model="username" disabled>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="code" type="text" v-model="code">
            <label for="code">code</label>
          </div>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light" @click="verify()">verify</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router.js'
import Auth from '@aws-amplify/auth';

export default {
  data() {
    return {
      username: localStorage.username,
      code: ""
    }
  },

  methods: {
    verify() {
      const username = localStorage.username
      const code = this.$data.code
      Auth.confirmSignUp(username, code, {
          // Optional. Force user confirmation irrespective of existing alias. By default set to True.
          forceAliasCreation: true
      }).then((data) => {
        console.log(data)
        router.push('/room')
      }).catch(err => console.log(err));
    }
  }
}
</script>