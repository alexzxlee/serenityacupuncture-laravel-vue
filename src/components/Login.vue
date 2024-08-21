<template>
    <v-dialog v-model="isNotLogin" width="auto" @click:outside="closeDialog" >
        <v-text-field label="Username" v-model="username" :rules="[required]" clearable style="color:aquamarine" hint="user123">
        </v-text-field>
        <v-text-field label="Password" v-model="password" :rules="[required]" clearable style="color:aquamarine" hint="pass123">
        </v-text-field>
        <v-btn color="success" @click="login" :disabled="!username || !password" block size="large" type="submit" variant="elevated" style="margin-top:10px;" min-width="228">
            Login&nbsp;<v-icon>mdi-login-variant</v-icon>
        </v-btn>
        <v-card-text v-if="errorMessage" style="color:lightpink">
            {{ errorMessage }}
        </v-card-text>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            isNotLogin: true,
            username: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        login() {
            if (this.username == "user123" && this.password == "pass123") {
                this.isNotLogin = false
            } else {
                this.errorMessage = "Invalid credential. Try again!"
            }
        },
        closeDialog() {
            setTransitionHooks.isNotLogin = true
        }
    }
}
</script>