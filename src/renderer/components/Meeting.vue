<template>
  <div id="meeting">
    <label>appID: {{appID}}</label>
    <br>
    <label>userID: {{userID}}</label>

    <div id="div_device" class="panel panel-default">
      <div class="select">
        <label for="audioSource">Audio source: </label><select id="audioSource"></select>
      </div>
      <div class="select">
        <label for="videoSource">Video source: </label><select id="videoSource"></select>
      </div>
    </div>

    <div id="div_join" class="panel panel-default">
      <div class="panel-body">
        <button id="join" class="btn btn-primary" :click="join()">Join</button>
        <button id="leave" class="btn btn-primary" :click="leave()">Leave</button>
        <button id="publish" class="btn btn-primary" :click="publish()">Publish</button>
        <button id="unpublish" class="btn btn-primary" :click="unpublish()">Unpublish</button>
      </div>
    </div>

    <div id="video" style="margin:0 auto;">
      <div id="agora_local" style="width:210px;height:147px;display:inline-block;"></div>
    </div>
  </div>
</template>

<script>

import AgoraRTC from 'agora-rtc-sdk';

export default {

  components: {

  },

  data() {
    return {
      appID: '547234c538334251a5a56b0c11a7ed89',
      userID: 'geshaoshan',
      client: {},
      localStream: {},
      counter: 100
    };
  },

  methods: {
    join() {

    },

    leave() {

    },

    publish() {

    },

    unpublish() {

    }
  },

  created() {
    this.client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});
    this.client.init(this.appID, function() {
      console.log("client init success");
    }, function(err) {
      console.log("client init failed: ", err);
    });
    this.localStream = AgoraRTC.createStream({
      streamID: this.userID,
      audio: true,
      video: true,
      screen: false
    });
    this.localStream.init(function () {
      console.log('local stream init success')
    }, function (err) {
      console.log('local stream init failed: ', err)
    });
  },

  mounted() {

  },

  beforeUpdate() {
      this.localStream.play('agora_local');
  }
};
</script>

<style>

</style>