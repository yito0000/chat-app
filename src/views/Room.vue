<template>
  <div id="room">
    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'

export default {
  name: 'room',
  components: {
    Chat
  }
}
</script>
