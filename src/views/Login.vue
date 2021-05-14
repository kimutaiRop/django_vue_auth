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
      console.log(data);
      console.log(this.AuthHandleLogin);
      this.$store.commit("login", data);
    },
  },
};
</script>