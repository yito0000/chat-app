# chat-app

## AppSyncの準備
以下を参考にMessageTableを作成
```/appsync_conf/schema.graphql```

以下のようにCreateMessageを編集
```
chat-app/appsync_conf/resolvers/CreateMessage.md
```

## Cognitoの準備
amplifyのインストール
```
$ npm install -g @aws-amplify/cli
$ amplify init
```
cognitoを追加
```
$ amplify add auth
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
