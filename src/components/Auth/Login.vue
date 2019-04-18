<template lang="pug">
  v-container(fluid py-5 style="max-width: 40%;")
    v-layout(justify-start align-center column)
      div
        h1 Get Started
        p(style="visibility: hidden; margin-top: -80px;") We've sent a temporary code to your email. Please paste it below.
        v-text-field(v-validate="'required|email'" 
                    name="email" 
                    type="text" 
                    v-model="email" 
                    browser-autocomplete 
                    clearable 
                    :loading="codeLoading"
                    label="Enter your email" 
                    required
                    autofocus
                    :hint="errors.first('email')" 
                    :error="errors.has('email')"
                    @change="resetCodeState()"
                    @click:clear="resetCodeState()")
        v-btn(v-if="!codeRequested" 
              color="primary" 
              block
              :disabled="!email || errors.has('email')" 
              @click="generateCode()") Continue with {{ getStep() }}
      div(:style="{visibility: codeRequested ? 'visible' : 'hidden'}")
        p We've sent a temporary code to your email. Please paste it below.
        v-btn(color="primary" 
              block
              flat
              @click="resendCode()") Resend Code
        v-text-field(name="code" 
                    type="text" 
                    v-model="code" 
                    clearable 
                    label="Enter your login code" 
                    required 
                    :hint="errors.first('code')" 
                    :error="errors.has('code')")
        span#errorMessage(v-show="codeError") {{authErrorMessage}}
        v-btn(color="primary" 
              block 
              @click="validateCode()") Continue with {{ getStep() }}
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: null,
      codeRequested: false,
      codeLoading: false,
      codeError: false,
      code: null
    };
  },
  props: {
    redirect: {
      type: Object,
      required: false,
      default: function() {
        return { path: "/" };
      }
    }
  },
  methods: {
    getStep() {
      return this.codeRequested ? "Code" : "Email";
    },
    generateCode() {
      let email = this.email;
      this.codeLoading = "loading2";
      let self = this;
      this.login({ email }, function() {
        self.codeLoading = false;
        self.codeRequested = true;
      });
    },
    validateCode() {
      let email = this.email;
      let code = this.code;
      let routerTarget = this.redirect;
      //console.log("Router Target: %s", JSON.stringify(routerTarget));
      let self = this;
      this.login({ email, code }, function() {
        self.codeError = false;
        if (self.code) self.$router.push(routerTarget);
      });
      //dispatch is async
    },
    login(credentials, callback) {
      let self = this;
      this.$store
        .dispatch("login", credentials)
        .then(callback)
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          console.log(err);
          self.codeError = true;
          self.codeLoading = false;
        });
    },
    resendCode() {
      this.codeError = false;
      this.generateCode();
    },
    resetCodeState() {
      this.codeError = false;
      this.codeRequested = false;
      this.code = null;
    }
  },
  components: {},
  computed: {
    authErrorMessage() {
      return this.$store.getters.authStatus;
    }
  }
};
</script>

<style lang="less">
@import (reference) "../../App.less";

h1 {
  margin-bottom: 20px;
  white-space: nowrap;
}

#errorMessage {
  color: @error;
}

#uwu {
  color: @info;
}
</style>
