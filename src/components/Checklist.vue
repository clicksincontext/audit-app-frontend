<template>
  <div>
    <p class="stat_title">Checklist page for Ads account <strong v-if="profile">{{profile.name}}</strong></p>
    <div class="accountId">{{accountId}}</div>

    <div class="resultList">

      <div v-for="(checkName, index) in checkNames" class="checllist_item">
        <div v-if="checks[checkName]" class="resultOuter">
          <div class="iconOuter">
            <img :src=" require(`../assets/${checks[checkName].imagename}`) " />
          </div>
          <div class="resultTitle"> {{checks[checkName].description}} </div>
          <div class="resultFlag" v-bind:class="checks[checkName].flag"> {{flagText(checks[checkName].flag)}}</div>
        </div>
        <div v-else class="resultLoading">Loading check..</div>
      </div>

      <div class='account_stats'>
        <div v-for="statName in statBlocks">
          <div v-if="stats[statName]" class="stat_block">
            <div class="stat_title">Account stats: {{stats[statName].description}} </div>
            <div class="conResultList">
              <div v-for="row in stats[statName].rows" class="conResultOuter">
                <div v-for="item in row"> {{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='sheet_link'>
        <span v-if="sheetUrl"> <a class="sheet_button" v-bind:href="sheetUrl">Click to get results in Google Sheet</a></span>
        <span v-else class="loading">Loading sheet link..</span>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['customerId'],
  data () {
    return {
      displayResponse: null,
      profile: null,
      accountId: this.customerId,
      checkNames: [],
      statBlocks: [],
      checks: {
        'conversions_check': null,
        'broad_modifiers_check': null,
        'short_modifiers_check': null,
        'mobile_firendly_pages': null,
        'landing_home_pages': null,
        'low_quality_keywords': null,
        'has_negatives': null,
        'has_changes':null,
        'has_more3_ads': null,
        'search_ctr': null,
        'ave_position': null,
        'have_trials': null,
        'has_modifiers': null,
        'has_customizers': null,
        'location_interested': null,
        'bid_strategy': null
      },
      stats : {
        'cost_per_conversions': null,
        'impressions_share': null
      },
      sheetUrl: null
    }
  },
  methods: {
    say: function (msg) {
      return `../assets/${msg}.png`
    },
    getCheckFlag (checkName) {
      console.log("checkName: ", checkName);
      const path = '/api/check_account/' + this.customerId + '/' + checkName
      axios.get(path)
      .then(response => {
        console.log("=========================================", response.data);
        this.checks[checkName] = response.data
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    getStats (checkName) {
      const path = '/api/check_account/' + this.customerId + '/' + checkName
      axios.get(path)
      .then(response => {
        console.log("+++++++++++++++++++++++++++++++++++++++", response.data);
        this.stats[checkName] = response.data
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    getProfile () {
      const path = '/api/get_profile/' + this.customerId
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.profile = response.data
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    getSheetUrl() {
      const path = '/api/create_sheet/' + this.customerId
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.sheetUrl = response.data.url
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    flagText(text) {
      switch (text) {
        case 'red':
          return 'Test Failed'
        case 'green':
          return 'Test Passed'
        case 'amber':
          return 'Test Passed Partly'
        default:
          return 'No data'
      }
    }
  },
  created () {
    //
    this.getProfile()
    for (let checkName in this.checks) {
      console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", checkName);
      this.checkNames.push(checkName)
      this.getCheckFlag(checkName)
    }
    for (let checkStat  in this.stats) {
      this.statBlocks.push(checkStat)
      this.getStats(checkStat)
    }
    this.getSheetUrl()
  }
}
</script>
<style media="screen">
  .red {
    color: red
  }

  .amber {
    color: darkorange
  }
  .green {
    color: green
  }

  .flex-grid {
    display: flex;
  }

  .flex-grid .col {
    /* flex: 1; */
    padding-right: 25px;
  }
  .description {
      text-align: right;
      width: 60%;
      margin: auto;
  }
  .flag {
    text-align: left;
    width: 40%;
    margin: auto;
  }

  .loading {
    animation: colorchange 1.2s;
    animation-iteration-count: infinite;
  }
  @keyframes colorchange {
      0%   {background: inherit;}
      50%  {background: #cccccc;}
      100% {background: inherit;}
  }
  .stat_block {
    display: inline-block;
    /*  padding-top: 25px;*/
  }
  .account_stats > div:first-child .stat_block .stat_title {
    margin: 0 0 80px;
  }
  .stat_block .stat_title {
      margin: 0 0 30px;
  }
  .stat_block table {
    text-align: right;
  }
  .account_stats > div:first-child .stat_block .conResultList > .conResultOuter:first-child {
    background-color: #ccc;
    display: none;
  }
  .stat_title {
    font-size: 160%;
    color: #2c3e50;
    margin: 0 0 30px;
  }
  .accountId {
    height: 185px;
    width: 185px;
    border: 3px solid #D9DADF;
    border-radius: 50%;
    margin: auto auto 50px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #fff;
    font-size: 25px;
    letter-spacing: 1.2px;
  }
  .accountId:before {
    position: absolute;
    content: "";
    left: -8px;
    top: -8px;
    width: 108%;
    height: 108%;
    border-radius: 50%;
    border: 1px dotted #D9DADE;
  }
  .sheet_button {
    border-radius: 8px;
    background-color: #037ABD;
    border: 2px solid transparent;
    color: white;
    padding: 1.2em 3em;
    display: inline-block;
    font-size: 18px;
    margin: 60px 0 40px;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out 0s;
  }
  .sheet_button:hover {
    background: #fff;
    color: #037ABD;
    border-color: #037ABD;
  }
  .resultList {
    width: 1170px;
    margin: auto;
    text-align: center;
  }
  .checllist_item {
    background: #fff;
    width: 265px;
    display: inline-block;
    vertical-align: top;
    border: 1px solid #F1F1F1;
    margin: 0 12px 25px;
    padding: 30px 25px;
    box-sizing: border-box;
    min-height: 195px;
}
.resultOuter {
    font-size: 17px;
    line-height: 21px;
}
.resultTitle {
  color: #2c3e50;
  margin-bottom: 10px;
  min-height: 42px;
}
#app .iconOuter img {
    width: 30px;
    height: auto;
    margin-bottom: 6px;
}
.account_stats > div:first-child {
    background: #fff;
    margin: 35px 0 60px;
    padding: 60px 0 80px;
}
.account_stats > div:first-child .conResultOuter {
    display: inline-block;
    vertical-align: top;
    width: 205px;
    height: auto;
    margin: 0px 40px 55px;
    position: relative;
    padding-bottom: 72px;
    font-size: 15px;
    line-height: 20px;
}
.account_stats > div:first-child .conResultOuter > div:nth-child(3) {
    border-radius: 50%;
    border: 1px solid #EAE9ED;
    height: 170px;
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #037ABD;
    font-weight: bold;
    font-size: 22px;
}
.account_stats > div:first-child .conResultOuter > div:nth-child(2) {
    position: absolute;
    right: 0;
    top: -20px;
    background: #037ABD;
    color: #fff;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
}
.account_stats > div:first-child .conResultOuter > div:nth-child(1) {
    position: absolute;
    bottom: 0;
}
.account_stats > div:nth-child(2) .stat_block {
    width: 100%;
}
.account_stats > div:nth-child(2) .conResultList .conResultOuter > div {
    display: inline-block;
    vertical-align: top;
    width: 33.3%;
    color: #fff;
    padding: 17px;
    box-sizing: border-box;
    border-right: 1px solid #fff;
}
.account_stats > div:nth-child(2) .conResultList .conResultOuter:first-child > div {
    padding-bottom: 0;
}
.account_stats > div:nth-child(2) .conResultList .conResultOuter:last-child > div {
    padding-top: 7px;
}
.account_stats > div:nth-child(2) .conResultList .conResultOuter > div:first-child {
    background: #78BB51;
}
.account_stats > div:nth-child(2) .conResultList .conResultOuter > div:nth-child(2) {
    background: #0079B6;
}
.account_stats > div:nth-child(2) .conResultList .conResultOuter > div:nth-child(3) {
    background: #006AA3;
    border: none;
}
</style>