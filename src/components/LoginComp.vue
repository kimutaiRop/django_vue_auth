<template>
  <div class="row">
    <div class="offset-md-4 col-md-4 login-form-1">
      <form @submit="handleLogin">
        <small class="text-danger" v-for="err of login_errors" :key="err.code">
          {{ err.message }} ⬇
        </small>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="Username"
            name="email"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            placeholder="your password"
          />
        </div>
        <button class="btn btn-success">login now</button>
      </form>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginComp",
  computed: {
    ...mapGetters(["login_errors", "login_success"]),
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      let data = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      };
      this.$emit("login-handler", data);
    },
  },
};
</script>
<style>
.login-container {
  margin-top: 5%;
  margin-bottom: 5%;
}
label {
  text-align: left !important;
}
.login-logo {
  position: relative;
  margin-left: -41.5%;
}
.login-logo img {
  position: absolute;
  width: 20%;
  margin-top: 19%;
  background: #282726;
  border-radius: 4.5rem;
  padding: 5%;
}
.login-form-1 {
  padding-top: 4%;
  padding-bottom: 9%;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 {
  padding: 9%;
  background: #f05837;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3 {
  text-align: center;
  margin-bottom: 12%;
  color: #fff;
}
.btnSubmit {
  font-weight: 600;
  width: 50%;
  color: #282726;
  background-color: #fff;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
}
.btnForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.btnForgetPwd:hover {
  text-decoration: none;
  color: #fff;
}
</style>