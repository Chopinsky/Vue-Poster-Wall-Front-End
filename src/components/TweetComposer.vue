<template>
  <div id="divContainer" class="w-75 center ba b--black-10">
    <div class="pv2 tc bb b--black-10 hover-effect" @click="toggleModal">
      <h1 class="ma0 f5 normal">Write On The Wall</h1>
    </div>

    <transition name="slide-fade">
      <div class="bg-near-white pa3" v-if="modalShowing">
        <textarea name="tweet" v-model="tweet" rows="3"
                  class="w-100 br2 ba b--black-10 pa2"
                  placeholder="Write your thoughts here"></textarea>

        <div v-if="photoHasBeenUploaded" class="bg-black-10 pa2 flex">
          <figure class="mv0 ml0 mr3 relative flex items-center justify-center" v-for="(photo, $index) in photos">
            <button @click="removePhoto($index)" class="button-reset pointer dim bn bg-black h2 w2 br-100 white flex items-center justify-center absolute absolute--fill-l center">
              <i class="material-icons f5">close</i>
            </button>
            <img v-bind:src="photo" class="h3 w3" alt="Uploaded photo">
          </figure>
        </div>

        <input multiple @change="handlePhotoUpload" ref="photoUpload" type="file" class="hide">

        <div class="mt3 flex justify-between">
          <div>
            <button @click="triggerFileUpload" class="button-reset flex items-center br2 bn bg-transparent blue hover-bg-black-10 pointer">
              <i class="material-icons f3">photo_camera</i>
            </button>
          </div>

          <div class="flex items-center">
            <span class="mr3 black-70" v-bind:class="{ 'light-red': underTwentyMark, 'dark-red': underTenMark }">
              {{ charLeft }}
            </span>
            <button :disabled="isTweetable" class="button-reset bg-blue bn white f6 fw5 pv2 ph3 br2 pointer dim">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        tweet: '',
        photos: [],
        modalShowing: false
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
        return this.photos.length > 0
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

      handlePhotoUpload: function (event) {
        const files = event.target.files

        if (!files || files.length < 1) {
          return
        }

        for (let i = 0; i < files.length; i++) {
          if (files[i]) {
            this.uploadOnePhoto(files[i])
          }
        }
      },

      uploadOnePhoto: function (file) {
        let reader = new FileReader()

        reader.onloadend = (event) => {
          if (event && event.target && event.target.result) {
            this.photos.push(event.target.result)
          }
        }

        reader.readAsDataURL(file)
      },

      triggerFileUpload: function () {
        this.$refs.photoUpload.click()
      },

      removePhoto: function (index) {
        this.photos.splice(index, 1)
      },

      toggleModal: function () {
        this.modalShowing = !this.modalShowing
        console.log(this.modalShowing)
      },

      modalEnter: function (el, done) {
        // Velocity(el, 'fadeIn', { 'duration': 300, 'complete': done, 'display': 'flex' })
      },

      modalLeave: function (el, done) {
        // Velocity(el, 'fadeOut', { 'duration': 300, 'complete': done })
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

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }

  .hover-effect:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }

  .photo-img {
    width: 100%;
    height: 100%;
  }

  .btn-close {
    left: auto;
    right: 5px;
    top: 5px;
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
