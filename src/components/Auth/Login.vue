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
                    label="Enter your email" 
                    required 
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
      this.codeRequested = true;
      this.code = null;
    },
    validateCode() {
      let email = this.email;
      let code = this.code;
      let routerTarget = this.redirect;
      //dispatch is async
      this.$store
        .dispatch("login", { email, code })
        .then(() => this.$router.push(routerTarget))
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          //console.log(err);
          this.codeError = true;
        });
    },
    resendCode() {
      this.resetCodeState();
      this.generateCode();
    },
    resetCodeState() {
      this.codeRequested = false;
      this.codeError = false;
      this.code = "";
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
