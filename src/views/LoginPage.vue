<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card>
                <v-toolbar dark="dark" color="primary">
                    <v-toolbar-title>로그인 해주세요.</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="mdi-account" name="login" label="Login" type="text" v-model="event.id">
                        </v-text-field>
                        <v-text-field
                            prepend-icon="mdi-lock" 
                            id="password"
                            name="password"
                            label="Password"
                            v-model="event.password"
                            type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" to="/">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {email: null, password: null, validationErrors: []};
        },
        methods: {
            resetError() {
                this.validationErrors = [];
            },
            validate() {
                // Clear the errors before we validate again
                this.resetError();
                // email validation
                if (!this.email) {
                    this
                        .validationErrors
                        .push("<strong>E-mail</strong> cannot be empty.");
                }
                if (/.+@.+/.test(this.email) != true) {
                    this
                        .validationErrors
                        .push("<strong>E-mail</strong> must be valid.");
                }
                // password validation
                if (!this.password) {
                    this
                        .validationErrors
                        .push("<strong>Password</strong> cannot be empty");
                }
                if (/.{6,}/.test(this.password) != true) {
                    this
                        .validationErrors
                        .push("<strong>Password</strong> must be at least 6 characters long");
                }
                // when valid then sign in
                if (this.validationErrors.length <= 0) {
                    this.signIn();
                }
            },
            signIn() {
                // @TODO signIn logic will come here
                console.log("sign in", this.email, this.password);
            }
        }
    };
</script>
<style></style>