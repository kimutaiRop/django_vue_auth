<template>
  <div class="row">
    <div class="offset-md-4 col-md-4 login-form-1">
      <form @submit="handleRegister">
        <div class="form-group">
          <div v-for="(value, name) in register_errors" :key="name">
            <div v-if="name === 'username'">
              <small class="text-danger" v-for="err in value" :key="err.code">
                {{ err.message }} ⬇
              </small>
            </div>
          </div>
          <label>Username</label>
          <input
            type="username"
            class="form-control"
            placeholder="Username"
            name="username"
          />
        </div>
        <div class="form-group">
          <div v-for="(value, name) in register_errors" :key="name">
            <div v-if="name === 'email'">
              <small class="text-danger" v-for="err in value" :key="err.code">
                {{ err.message }} ⬇
              </small>
            </div>
          </div>
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="Username"
            name="email"
          />
        </div>
        <div class="form-group">
          <div v-for="(value, name) in register_errors" :key="name">
            <div v-if="name === 'password1'">
              <small
                class="text-danger text-small"
                v-for="err in value"
                :key="err.code"
              >
                {{ err.message }} ⬇
              </small>
            </div>
          </div>
          <label>Password</label>
          <input
            name="password1"
            type="password"
            class="form-control"
            placeholder="your password"
          />
        </div>
        <div class="form-group">
          <div v-for="(value, name) in register_errors" :key="name">
            <div v-if="name === 'password2'">
              <small class="text-danger" v-for="err in value" :key="err.code">
                {{ err.message }} ⬇ <br />
              </small>
            </div>
          </div>
          <label>Password</label>
          <input
            name="password2"
            type="password"
            class="form-control"
            placeholder="confirm your password"
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
  name: "RegisterComp",
  computed: {
    ...mapGetters(["register_errors", "register_success"]),
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      let data = {
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        password1: e.target.elements.password1.value,
        password2: e.target.elements.password2.value,
      };
      this.$emit("handle-register", data);
    },
  },
};
</script>

