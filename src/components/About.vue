

<!-- Contact.vue -->

<template>
  <v-form ref="form" v-model="valid">
    <v-layout>

      <span class="display-2">Contact Us</span>

      <v-text-field label="Email" type="text" name="email" v-model="contactDetail['name']"></v-text-field>

      <v-text-field label="Message" type="text" name="message" v-model="contactDetail['message']"></v-text-field>

      <v-btn color="primary" @click="validateAndSubmit">Submit</v-btn>

    </v-layout>
  </v-form>
</template>

<!-- Contact.vue -->

<script>
// import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
// Vue.use(VueReCaptcha, { siteKey: "your-google-recaptcha-site-key" });
export default {
  data() {
    return {
      valid: true,
      contactDetail: { email: "", message: "" },
    };
  },
  methods: {
    validateAndSubmit() {
      if (this.$refs.form.validate()) {
        this.disableSubmit = true;
        console.log("Z1");
        this.$recaptcha("contactus").then((token) => {
          console.log(token);
          this.parseContactInfo(this.contactDetail);
          // parse & store data. Method can be housed in Vuex store
          // show confirmation message
console.log("Z2");
          
          router.push("/");
          // navigate to home page after processing  data
        });
      }
    },
  },
};
</script>
