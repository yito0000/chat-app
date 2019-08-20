<template>
  <div id="chat">
    <div>チャットルーム</div>
    <div>ユーザー名 : {{ username }}
      <a style="cursor: pointer" @click="back()">名前変更</a>
    </div>
    <div class="divider"></div>
    <div id="messages-div" class="section blue-grey lighten-4" style="height: 500px; overflow: hidden; overflow-y: scroll">
      <div id="messages-container" class="container">
        <ul>
          <li v-for="message in this.$data.messages">
            <div class="row z-depth-2 white" style="margin-bottom: 10px">
              <div class="col s9">
                <span style="font-size: small">{{ message.username }}</span>&nbsp<span style="font-size: x-small">{{ dateFormat(message.createDate) }}</span>
                <p v-for="text in messageSplit(message.text)" style="margin: 0px">{{ text }}</p>
              </div>
            </div>
          </li>
          <li v-for="message in this.$data.pullMessages">
            <div class="row z-depth-2 white" style="margin-bottom: 10px">
              <div class="col s9">
                <span style="font-size: small">{{ message.username }}</span>&nbsp<span style="font-size: x-small">{{ dateFormat(message.createDate) }}</span>
                <p v-for="text in messageSplit(message.text)" style="margin: 0px">{{ text }}</p>
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
import router from '../router.js'
import { listMessages } from '../graphql/queries.js'
import { createMessage } from '../graphql/mutations.js'
import { onCreateMessage } from '../graphql/subscriptions.js'

const moment = require('moment')

export default {
  name: 'chat',
  data() {
    return {
      username: localStorage.username,
      messages: [],
      pullMessages: [],
      inputMessage: "",
    }
  },

  mounted() {
    if(!localStorage.username) {
      router.push('/')
    }
    this.$apollo.queries.messages.fetchMore({
      updateQuery: (previousResult, { fetchMoreResult }) => {
        this.updateMessages(fetchMoreResult.listMessages)
        return
      },
    })

  },

  methods: {
    back() {
      localStorage.clear()
      router.push('/')
    },
    stringParseToMoment(stringDate) {
      return moment(stringDate, "YYYY-MM-DDTHH:mm:ss.SSSZ")
    },
    dateFormat(createDate) {
      var m = this.stringParseToMoment(createDate)
      return m.format('YYYY/MM/DD HH:mm:ss');
    },
    async registMessage() {
      const input = new Object()
      input.username = localStorage.username
      input.text = this.$data.inputMessage
      createMessage(input)
      this.$data.inputMessage = ""
    },
    updateMessages(newMessages) {
      this.messages = this.listMessagesSorted(newMessages.items)
      this.scroll()
    },
    scroll() {
      this.$nextTick(function() {
        let div = document.getElementById('messages-div')
        div.scrollTop = div.scrollHeight
      })
    },
    listMessagesSorted(data) {
      return data.sort((o1, o2) => {
        return moment(this.stringParseToMoment(o1.createDate)).isAfter(this.stringParseToMoment(o2.createDate)) ? 1 : -1
      })
    },
    messageSplit(message) {
      return message.split(/\r\n|\r|\n/)
    }
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
          this.$data.pullMessages.push(subscriptionData.data.onCreateMessage)
          this.scroll()
        }
      }
    }
  },

}

</script>