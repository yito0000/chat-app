<template>
  <div id="login">
    <div>
      <SignIn/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'login',
  components: {
    SignIn,
  },

}
</script>
