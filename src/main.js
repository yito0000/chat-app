import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import AWSAppSyncClient from "aws-appsync"
import AwsConfig from './aws-exports.js'
import Amplify from 'aws-amplify'
import routes from './router.js'

const config = {
  url: AwsConfig.aws_appsync_graphqlEndpoint,
  region: AwsConfig.aws_appsync_region,
  auth: {
    type: AwsConfig.aws_appsync_authenticationType,
    apiKey: AwsConfig.aws_appsync_apiKey,
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

Amplify.configure(AwsConfig)

new Vue({
  provide: appsyncProvider.provide(),
  router: routes,
  render: h => h(App)
}).$mount('#app')
