<template>
  <div id="divContainer" class="w-75 center ba b--black-10">
    <div class="pv2 tc bb b--black-10">
      <h1 class="ma0 f5 normal">Compose New Tweet</h1>
    </div>
    <div class="bg-near-white pa3">
      <textarea name="tweet" v-model="tweet" rows="3"
                class="w-100 br2 ba b--black-10 pa2"
                placeholder="Write your tweet here"
      >
      </textarea>
      <div class="tr">
        <span class="mr3 black-70"
              v-bind:class="{ 'light-red': underTwentyMark(), 'dark-red': underTenMark() }">
          {{ charLeft() }}
        </span>
        <button :disabled="isTweetable()"
                class="button-reset bg-blue bn white f6 fw5 pv2 ph3 br2 pointer dim"
        >
          Tweet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        tweet: ''
      }
    },
    methods: {
      maxCharCount: function () {
        return 140
      },
      isTweetable: function () {
        return !((this.tweet.length > 0) && (this.tweet.length <= this.maxCharCount()))
      },
      charLeft: function () {
        return (this.maxCharCount() - this.tweet.length)
      },
      underTwentyMark: function () {
        return (this.maxCharCount() - this.tweet.length < 20) && (this.maxCharCount() - this.tweet.length >= 10)
      },
      underTenMark: function () {
        return (this.maxCharCount() - this.tweet.length < 10)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #divContainer {
    margin-top: 10px;
  }

  button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
