<template>
  <div id="divContainer" class="w-75 center ba b--black-10">
    <div class="pv2 tc bb b--black-10">
      <h1 class="ma0 f5 normal">Write On The Wall</h1>
    </div>

    <div class="bg-near-white pa3">
      <textarea name="tweet" v-model="tweet" rows="3"
                class="w-100 br2 ba b--black-10 pa2"
                placeholder="Write your thoughts here"
      ></textarea>

      <div v-if="photoHasBeenUploaded" class="bg-black-10 pa2 flex">
        <figure class="ma0 relative flex items-center justify-center">
          <button @click="removePhoto()" class="button-reset pointer dim bn bg-black h2 w2 br-100 white flex items-center justify-center absolute absolute--fill-l center">
            <i class="material-icons f5">close</i>
          </button>
          <img v-bind:src="photo" class="h3 w3" alt="Uploaded photo">
        </figure>
      </div>

      <input @change="handlePhotoUpload()" ref="photoUpload" type="file" class="hide">

      <div class="mt3 flex justify-between">
        <div>
          <button @click="triggerFileUpload()" class="button-reset flex items-center br2 bn bg-transparent blue hover-bg-black-10 pointer">
            <i class="material-icons f3">photo_camera</i>
          </button>
        </div>

        <div class="flex items-center">
          <span class="mr3 black-70" v-bind:class="{ 'light-red': underTwentyMark, 'dark-red': underTenMark }">
            {{ charLeft }}
          </span>
          <button :disabled="isTweetable" class="button-reset bg-blue bn white f6 fw5 pv2 ph3 br2 pointer dim"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        tweet: '',
        photo: null
      }
    },
    computed: {
      underTwentyMark: function () {
        return (this.maxCharCount() - this.tweet.length < 20) && (this.maxCharCount() - this.tweet.length >= 10)
      },

      underTenMark: function () {
        return (this.maxCharCount() - this.tweet.length < 10)
      },

      photoHasBeenUploaded: function () {
        return !!this.photo
      },

      isTweetable: function () {
        return !((this.tweet.length > 0) && (this.tweet.length <= this.maxCharCount()))
      },

      charLeft: function () {
        return (this.maxCharCount() - this.tweet.length)
      }
    },
    methods: {
      maxCharCount: function () {
        return 140
      },

      handlePhotoUpload: function () {

      },

      triggerFileUpload: function () {

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

  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v30/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  .hide {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute !important;
    width: 1px;
  }
</style>
