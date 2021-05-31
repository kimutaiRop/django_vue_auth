import Vue from 'vue'
import Vuex from 'vuex'
import { client } from '../apollo_client'
import gql from "graphql-tag";
import router from '../router'
import * as _ from 'underscore'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    token: "",
    user: {},
    profile: {},
    login_errors: [],
    register_errors: {},
    login_success: false,
    register_success: false,
    rem_seconds: 0,
    intervalObj: null
  },

  mutations: {
    LogoutTimer(state, exp) {
      state.intervalObj = setInterval(() => {
        exp = new Date(localStorage.getItem("expiry"))
        let rem = exp - new Date()
        if (rem > 0) {
          state.rem_seconds = rem
        } else {
          clearInterval(state.intervalObj);
        }
      }, 1000);
    },
    logout(state) {
      clearInterval(state.intervalObj);
      localStorage.removeItem("token")
      localStorage.removeItem("expiry")
      sessionStorage.removeItem("refresh_token")
      state.rem_seconds = 0
      let path = _.findWhere(router.options.routes, { name: router.history.current.name })
      if (path.meta.requiresAuth) {
        router.push({ name: 'Login' })
      }
      state.user = {}
      state.profile = {}
    },
    checkAuth(state) {
      let token = localStorage.getItem("token")
      let expiry = localStorage.getItem("expiry")
      let now_ = new Date()
      let exp_time = new Date(expiry)
      if (exp_time > now_) {
        clearInterval(state.intervalObj);
        this.commit("LogoutTimer", exp_time)
        state.token = token

      } else {
        this.commit("logout")
      }
    },

    completeLogin(state, data) {
      state.token = data.token
      localStorage.setItem("token", data.token)
      let dt = new Date();
      dt.setMinutes(dt.getMinutes() + 30);
      localStorage.setItem("expiry", dt)
      clearInterval(state.intervalObj);
      this.commit("LogoutTimer", dt)
      sessionStorage.setItem("refresh_token", data.refresh_token)
      if (data.push) {
        let next_url = data.next_url
        router.push(next_url)
      }
    },
    login(state, data_) {
      state.login_errors = {}
      let next_url = data_['next_url']
      delete data_['next_url']
      const LOGIN_QUERY = gql`
      mutation($email: String!, $password: String!) {
        tokenAuth(password: $password, email: $email) {
          token
          success
          refreshToken
          errors
          user {
            pk
            username
            firstName
            lastName
            email
            isActive
            userprofile{
              id
              idNumber
              balance
              lockedAmount
              image
            }
          }
        }
      }
    `;
      client.mutate({
        mutation: LOGIN_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          if (!data.tokenAuth.errors) {
            state.login_success = data.tokenAuth.success
            let user = data.tokenAuth.user
            let profile = user['userprofile']
            delete user['userprofile']
            state.user = user
            state.profile = profile
            let dt = {
              "token": data.tokenAuth.token,
              "refresh_token": data.tokenAuth.refreshToken,
              "push": true,
              "next_url": next_url
            }
            this.commit("completeLogin", dt)
          } else {
            state.login_errors = data.tokenAuth.errors.nonFieldErrors
          }
        }
      });
    },
    register(state, data_) {
      state.register_errors = {}
      let REGISTER_QUERY = gql`
        mutation(
          $username: String!
          $email: String!
          $password1: String!
          $password2: String!
        ) {
          register(
            username: $username
            email: $email
            password1: $password1
            password2: $password2
          ) {
            success
            errors
          }
        }
      `;
      client.mutate({
        mutation: REGISTER_QUERY,
        variables: data_,
        update: (cache, { data }) => {
          if (!data.register.errors) {
            state.register_success = data.register.success
          } else {
            state.register_errors = data.register.errors
          }
        },
      });
    },
    refreshSessionToken() {
      let token = sessionStorage.getItem("refresh_token")
      let REFRESH_QUERY = gql`
      mutation ($token: String!) {
        refreshToken(refreshToken:$token){
          token
          refreshToken
          success
        }
      }
      `;
      client.mutate({
        mutation: REFRESH_QUERY,
        variables: { token: token },
        update: (cache, { data }) => {
          if (token) {
            let dt = {
              "token": data.refreshToken.token,
              "refresh_token": data.refreshToken.refreshToken,
              "push": false
            }
            this.commit("completeLogin", dt)
          }
        }
      })
    },

  },
  actions: {
  },
  modules: {
  },
  getters: {
    token: state => {
      return state.token
    },
    user: state => {
      return state.user
    },
    profile: state => {
      return state.user
    },
    login_errors: state => {
      return state.login_errors
    },
    login_success: state => {
      return state.login_success
    },
    register_success: state => {
      return state.register_success
    },
    register_errors: state => {
      return state.register_errors
    },
    rem_seconds: state => {
      return state.rem_seconds
    }
  }
})
