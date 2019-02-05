<template>
  <div class="chat">
    <h1>chat</h1>
    <ul>
      <li v-for="message in messages">
        <p>create_date : {{ dateFormat(message.create_date) }}</p>
        <p>text : {{ message.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { listMessages } from '../graphql/queries.js'

const moment = require('moment')

export default {
  data() {
    return {
      messages: []
    }
  },

  mounted() {
  },

  apollo: {
    messages: {
      query: () => listMessages,
      update: data => {
        return data.listMessages.items
      }
    }
  },

  methods: {
    dateFormat(createDate) {
      var m = moment(createDate, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      return m.format('YYYY/MM/DD HH:mm:ss');
    }
  }
}

</script>