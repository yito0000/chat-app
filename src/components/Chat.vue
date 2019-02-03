<template>
  <div class="chat">
    <ApolloQuery
      :document="listMessages()"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">...Loading</div>
        <div v-else-if="error">error</div>
        <div v-else>{{ data }}</div>
      </template>

    </ApolloQuery>
  </div>
</template>

<script>
import { getMessage, listMessages } from './graphql'

</script>