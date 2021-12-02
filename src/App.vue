<template>
    <v-app>
        <v-app-bar app="app" color="primary" dark="dark">
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain="contain"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"/>

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain="contain"
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"/>
            </div>
            <v-spacer></v-spacer>
            <div class="LoginCheckLayout">
                <LoginLayout/>
            </div>
            <!--
            생각해보니 여기에 라우터를 두면 어카냐....
            <v-btn v-if="checkLoginMode()" target="_blank" text="text">
                <span class="mr-2">Welcome {{this.adminID}}</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn v-else-if="!checkLoginMode()" target="_blank" text="text">
              <router-link to="/LoginPage" class="link">              
                <span class="mr-2">Login</span>
                <v-icon>mdi-lock</v-icon>
              </router-link>
            </v-btn>
            -->
        </v-app-bar>
        <v-main>
            <router-view/>
            <!--시작페이지를 보여주는 부분.-->
        </v-main>
    </v-app>
</template>

<script>
    //import StartPage from './views/StartPage.vue';
    //import LoginPage from "./views/LoginPage.vue"
    import LoginLayout from "./components/LoginLayout.vue"

    export default {
        name: 'App',
        computed: {
            adminID() {
                return this.$store.state.admin.currentUser.userID;
            }
        },
        components: {
            //StartPage
            LoginLayout
        },
        methods: {
        },
        data() {
            return {
              LoginCheckData: false
            }
        }
    };
</script>
<style>
    .LoginCheckLayout {
        float: right;
        width: 200px;
    }
    .link {
        width: 100% !important;
        height: 100% !important;
        color: white !important;
        text-decoration: none !important;
    }
</style>