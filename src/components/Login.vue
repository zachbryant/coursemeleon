<template lang="pug">
  v-container(fluid py-5 style="max-width: 30%;")
    v-layout(justify-start align-center column)
      h1 Get Started
      v-text-field(v-validate="'required|email'" 
                  name="email" 
                  type="text" 
                  style="width: 100%;"
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
      div(v-show="codeRequested")
        span We've sent a temporary code to your email. Please paste it below.
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
        span#errorMessage(v-show="codeError") Your code was invalid or expired.
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
      let routerTarget = this.props.redirect;
      this.$store
        .dispatch("login", { email, code })
        .then(() => this.$router.push(routerTarget))
        .catch(err => console.log(err));
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
  computed: {}
};
</script>

<style lang="less">
@import (reference) "../App.less";

h1 {
  margin-bottom: 20px;
}

#errorMessage {
  color: @error;
}

#uwu {
  color: @info;
}
</style>
