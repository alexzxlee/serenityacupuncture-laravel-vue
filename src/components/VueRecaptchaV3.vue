<template>
        <v-btn color="success" @click="recaptcha" :disabled="!bookingForm || !recaptchaV2" :loading="loading" block size="large" type="submit" variant="elevated" style="margin-top:10px;">
            <!-- @click="bookingDialog3 = !bookingDialog3" -->
            <v-icon>mdi-cloud-upload</v-icon>&nbsp;Submit
        </v-btn>
</template>

<script>
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { ref } from 'vue'
export default {
    props: {
        bookingForm: Boolean,
        loading: Boolean,
        recaptchaV2: Boolean,
    },
    emits: ['responseRecaptchaV3'],
    setup(props, { emit }) {
        const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
        const recaptcha = async () => {
            // (optional) Wait until recaptcha has been loaded.
            await recaptchaLoaded()

            // Execute reCAPTCHA with action "login", "submit", "homepage", "e-commerce". 
            const token = await executeRecaptcha('login')
            const data = ref(null);
            const error = ref(null);
            const recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
            const secret = '6Le8eLkjAAAAABt0ippzdf48bfAguZe5dW_idzo4';
            const params = new URLSearchParams({
                secret: secret,
                response: token,
            });

            await fetch(recaptchaUrl + "?" + params.toString(), { method: 'POST' })
                .then((res) => res.json())
                .then((json) => (data.value = json))
                .catch((err) => (error.value = err));

            if (data.value) {
                if (data.value.success) {
                    console.log("Data responded from recaptchaV3: " + JSON.stringify(data.value));
                    // "challenge_ts": "2023-02-16T01:00:41Z"
                    if (data.value.score >= 0.5) {
                        console.log("Verified by recaptchaV3.");
                        emit('responseRecaptchaV3', true);
                    } else {
                        console.log("You are a robot!");
                    }
                } else {
                    console.log("Error codes responded: " + data.value['error-codes'].join());
                }
            } else {
                console.log("No data responded: " + error.value);
            }
        }

        return {
            recaptcha
        }

        // navigate to home page after processing data
        // const recaptcha = this.$recaptchaInstance

        // Hide reCAPTCHA badge:
        // recaptcha.hideBadge()

        // Show reCAPTCHA badge:
        // recaptcha.showBadge()

        // src="https://www.google.com/recaptcha/api.js" async defer
    },
}
</script>