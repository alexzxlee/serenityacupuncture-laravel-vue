<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

        <form @submit.prevent="onSubmit" :class="{mx_form_inv: formInv}">
            <div>
                <label for="mxSubject">Subject</label><br />
                <input type="text" id="mxSubject" v-model="subject" :class="{ mx_empty_filed: !subject }" /><br />
                <small>Fill in the subject</small>
            </div>
            <div>
                <label for="mxMessage">Your message</label><br />
                <textarea id="mxMessage" cols="30" rows="10" v-model="message"
                    :class="{ mx_empty_filed: !message }"></textarea><br />
                <small>Fill in the message</small>
            </div>
            <div :class="{ mx_recaptcha_failed: !recaptcha }">
                <vue-recaptcha :sitekey="sitekey" @verify="onVerify" @expired="onExpired"></vue-recaptcha>
                <br />
                <small>Doesn't complete!</small>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </v-responsive>
  </v-container>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha';

export default {
    components: { VueRecaptcha },
    data() {
        return {
            subject: null,
            message: null,
            formInv: false,
            recaptcha: null,
            sitekey: "6LcgGLwjAAAAAHqM9IEaju-hORsaQsZhbyMVWfBp"
        }
    },
    methods: {
        onSubmit: function () {
            // this.$refs.invisibleRecaptcha.execute()
            if (this.subject && this.message && this.recaptcha) {
                console.log('Submit');
            } else {
                console.log('Incomplete');
                this.formInv = true;
            }
        },
        onVerify: function (response) {
            this.recaptcha = response; // response code
            console.log('Verified: ' + response);
            // this.$refs.recaptcha.execute();
        },
        onExpired: function () {
            this.recaptcha = null;
            console.log('Expired')
        },
        // resetRecaptcha() {
        //     this.$refs.recaptcha.reset() // Direct call reset method
        // },
    }
};
</script>