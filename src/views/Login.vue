<template>
  <div>
    <LoginComp @login-handler="loginHandler" />
  </div>
</template>

<script>
import LoginComp from "../components/LoginComp";

export default {
  name: "Login",
  components: {
    LoginComp,
  },

  methods: {
    loginHandler(data) {
      this.$store.commit("login", data);
    },
  },
};
</script>