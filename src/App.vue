<template>
    <v-app>
        <v-app-bar app="app" color="mainColor" dark="dark">
            <div class="d-flex align-center">
                <v-img
                    @click="goMainPage()"
                    class="shrink mr-2"
                    contain="contain"
                    src="./assets/logo.png"
                    transition="scale-transition"
                    width="300"/>
            </div>
            <v-spacer></v-spacer>
            <div class="LoginCheckLayout">
                <LoginLayout/>
            </div>
        </v-app-bar>
        <v-main>
            <router-view/>
            <!--시작페이지를 보여주는 부분.-->
        </v-main>
    </v-app>
</template>

<script>
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
            goMainPage(){
                this
                    .$router
                    .push({path: '/', params: {}})
                    .catch(() => {})
            }
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
    }
    .link {
        width: 100% !important;
        height: 100% !important;
        color: white !important;
        text-decoration: none !important;
    }
</style>