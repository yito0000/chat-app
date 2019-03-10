<template>
  <div id="login">
    <div v-if="isNeedSignUp">
      <SignUp/>
      <div class="divider"></div>
      <div class="section">
        <div class="container" style="float: right">
          <div class="row">
            <button class="btn waves-effect waves-light" @click="openLogin()">login</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <SignIn/>
      <div class="divider"></div>
      <div class="section">
        <div class="container" style="float: right">
          <div class="row">
            <button class="btn waves-effect waves-light" @click="openSignUp()">sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'login',
  components: {
    SignIn,
    SignUp
  },

  data() {
    return {
      isNeedSignUp: false
    }
  },

  methods: {
    openLogin() {
      this.$data.isNeedSignUp = false
    },

    openSignUp() {
      this.$data.isNeedSignUp = true
    },
  }
}
</script>
