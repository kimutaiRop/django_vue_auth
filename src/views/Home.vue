<template>
  <div class="home">
    <HomePage />
    token will expire in
    {{ parseInt(rem_seconds / 1000) }} seconds
    <br />
    button to refresh will appear 30 seconds before expiry
    <button v-if="rem_seconds < 30000" @click="refreshToken">
      refresh token
    </button>
  </div>
</template>
<script>
// @ is an alias to /src
import HomePage from "@/components/Home.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    HomePage,
  },
  computed: {
    ...mapGetters(["user", "profile", "rem_seconds"]),
  },
  methods: {
    refreshToken() {
      this.$store.commit("refreshToken");
    },
  },
};
</script>
