<!--사용자 정보 업데이트 페이지.-->
<template>
    <v-list justify-center="justify-center">
        <BackToStartPage/>
        <div class="MainFrame">
            <v-spacer></v-spacer>
            <v-layout justify-center="justify-center">
                <v-text-field class="userID" label="사용자 이름" v-model="LoginUser.userName"></v-text-field>
            </v-layout>
            <v-layout justify-center="justify-center">
                <v-date-picker v-model="LoginUser.userBirthDay"></v-date-picker>
            </v-layout>
            <v-layout justify-center="justify-center">
                <span class="UpdateText">{{
                    LoginUser.userBirthDay
                    }}
                </span>
            </v-layout>
            <br>
            <v-layout justify-center="justify-center">
                <v-card-actions justify-center="justify-center">
                    <v-btn class="UpdateText" color="mainColor" @click="UpdateUserInfo">정보수정</v-btn>
                </v-card-actions>
            </v-layout>
        </div>
        <Alert :dialog="true"/>
    </v-list>
</template>
<script>
    import BackToStartPage from "../components/BackToStartPage.vue";
    import Alert from "../components/AlertForm.vue";
    export default {
        components: {
            Alert,
            BackToStartPage
        },
        mounted() {
            /*this.$store.state.currentUser.userBirthDay = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);*/
        },
        computed: {
            LoginUser() {
                return this.$store.state.admin.currentUser;
            }
        },
        methods: {
            UpdateUserInfo(){
                this
                    .$store
                    .commit("UPDATE_USER_INFO", this.$store.state.admin.currentUser);
                this
                    .$store
                    .commit("OPEN_ALERT_PAGE_OVER_MODE", "정보 수정 성공!");
            }
        }
    }
</script>
<style>
    .UpdateText {
        font-weight: 800;
    }
    .blackColorVer{
        color: black;
    }
    .MainFrame {
        margin-left: 3%;
        margin-right: 3%;
        margin-bottom: 3%;
    }
    .CreateArticlePageWidth {
        width: 1000px;
    }
</style>