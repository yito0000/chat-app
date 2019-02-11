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

const __stringParseToMoment = ((stringDate) => {
  return moment(stringDate, "YYYY-MM-DDTHH:mm:ss.SSSZ")
})

export default {
  data() {
    return {
      messages: []
    }
  },

  mounted() {
  },


  methods: {
    dateFormat(createDate) {
      var m = __stringParseToMoment(createDate)
      return m.format('YYYY/MM/DD HH:mm:ss');
    }
  },

  apollo: {
    messages: {
      query: () => listMessages,
      update: data => {
        return data.listMessages.items.sort((o1, o2) => {
          return moment(__stringParseToMoment(o1.create_date)).isAfter(__stringParseToMoment(o2.create_date)) ? 1 : -1
        })
      }
    }
  },

}

</script>