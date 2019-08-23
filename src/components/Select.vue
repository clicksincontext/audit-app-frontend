<template>
  <div id="select">
    <p>{{displayResponse}}</p>
    <p v-if="user && user.name">Hello {{user.name}}. <span v-if="clientList"> Please select an account from the list</span></p>
    <div id="client_list" v-if="clientList && !noAds">
      <div class="master_accounts" v-if="clientList.master.length">
        <div v-for="client in clientList.master">
          <div v-if="client.canManageClients">
            <div>Accounts under {{ client.name }} master account:</div>
            <div class="child_accounts">
              <div v-for="childClient in client.child">
                <router-link :to="{name: 'Checklist',  params: { customerId: childClient.id }}">{{ childClient.name }}</router-link>, ID {{ childClient.id}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="clientList.direct.length">
        <div>Direct access accounts:</div>
        <div class="child_accounts">
          <div v-for="client in clientList.direct"><router-link :to="{name: 'Checklist',  params: { customerId: client.id}}">{{ client.name }}</router-link>, ID {{ client.id}}</div>
        </div>
      </div>
    </div>
    <span v-if="!clientList && !noAds"> Loading accounts list</span>
    <span v-if="noAds"> This Google Account is not linked to Google Ads. Please <router-link to="/">try another</router-link> Google Account</span>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      displayResponse: null,
      user: {},
      clientList: null,
      noAds: false
    }
  },
  methods: {
    getUserProperties () {
      const path = '/api/get_user'
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.user = response.data
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/')
      })
    },
    getClientList () {
      const path = '/api/get_client_list'
      axios.get(path)
      .then(response => {
        console.log(response.data);
        if (response.data.status &&  response.data.status == 'no_ads') return this.noAds = true
        let clientList = response.data.reduce((list, client) => {
          if (client.canManageClients) {
           list.master.push(client)
          } else {
            list.direct.push(client)
          }
          return list
        }, { 'direct': [], 'master': [] })
        this.clientList = clientList
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    }
  },
  created () {
    this.getUserProperties()
    this.getClientList()
  }
}

</script>
<style>
  div#client_list {
    text-align: left;
    display: inline-block;
    font-size: 16px;
  }
  .child_accounts {
    padding-left: 25px;
  }
</style>
