<template>
  <div id="chat">
    <div class="section teal lighten-4">
      <h1>chat</h1>
    </div>

    <div class="divider"></div>
    <div id="messages-div" class="section blue-grey lighten-4">
      <div id="messages-container" class="container" style="height: 500px; overflow: hidden; overflow-y: scroll">
        <ul>
          <li v-for="message in this.$data.messages">
            <div class="row z-depth-2 white" style="margin-bottom: 10px">
              <div class="col s9">
                <p style="font-size: x-small">{{ dateFormat(message.create_date) }}</p>
                <p>{{ message.text }}</p>
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
            <textarea v-model="inputMessage" id="textarea1" class="materialize-textarea"></textarea>
            <label for="textarea1">メッセージを入力してください</label>
            <a style="float: right" class="waves-effect waves-light btn" @click="registMessage()">送信</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listMessages } from '../graphql/queries.js'
import { createMessage } from '../graphql/mutations.js'
import { onCreateMessage } from '../graphql/subscriptions.js'

const moment = require('moment')

export default {
  name: 'chat',
  data() {
    return {
      messages: [],
      inputMessage: "",
    }
  },

  mounted() {
    this.$apollo.queries.messages.fetchMore({
      updateQuery: (previousResult, { fetchMoreResult }) => {
        this.updateMessages(fetchMoreResult.listMessages)
        return
      },
    })

  },

  methods: {
    stringParseToMoment(stringDate) {
      return moment(stringDate, "YYYY-MM-DDTHH:mm:ss.SSSZ")
    },
    dateFormat(createDate) {
      var m = this.stringParseToMoment(createDate)
      return m.format('YYYY/MM/DD HH:mm:ss');
    },
    async registMessage() {
      createMessage(this.inputMessage)
      let container = document.getElementById('messages-container')
      container.scrollTop = container.scrollHeight
    },
    updateMessages(newMessages) {
      this.messages = this.listMessagesSorted(newMessages.items)
      let container = document.getElementById('messages-container')
      container.scrollTop = container.scrollHeight
    },
    listMessagesSorted(data) {
      return data.sort((o1, o2) => {
        return moment(this.stringParseToMoment(o1.create_date)).isAfter(this.stringParseToMoment(o2.create_date)) ? 1 : -1
      })
    },
  },

  apollo: {
    messages: {
      query: listMessages,
      update: function(data) {
        return this.listMessagesSorted(data.listMessages.items)
      },
      subscribeToMore: {
        document: onCreateMessage,
        updateQuery: function(previousResult, { subscriptionData }) {
          this.$data.messages.push(subscriptionData.data.onCreateMessage)
        }
      }
    }
  },

}

</script>