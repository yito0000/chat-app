<template>
  <div class="chat">
    <div class="section teal lighten-4">
      <h1>chat</h1>
    </div>

    <div class="divider"></div>
    <div class="section blue-grey lighten-4">
      <div class="container">
        <ul>
          <li v-for="message in messages">
            <div class="row z-depth-2 white" style="margin-bottom: 10px">
              <div class="col s9">
                <p>create_date : {{ dateFormat(message.create_date) }}</p>
                <p class="flow-text">text : {{ message.text }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="divider"></div>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="input-field col s9 offset-s3">
            <textarea id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">メッセージを入力してください</label>
            <a style="float: right" class="waves-effect waves-light btn">送信</a>
          </div>
        </div>
      </div>
    </div>
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