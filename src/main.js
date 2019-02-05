import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import AWSAppSyncClient from "aws-appsync"
import appSyncConfig from './aws-exports.js'

Vue.config.productionTip = false

const config = {
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  }
}
const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
}

const client = new AWSAppSyncClient(config, options)
const appsyncProvider = new VueApollo({
  defaultClient: client
})

Vue.config.productionTip = false
Vue.use(VueApollo)

new Vue({
  provide: appsyncProvider.provide(),
  render: h => h(App)
}).$mount('#app')
