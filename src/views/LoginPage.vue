<!--로그인 페이지-->
<template>
    <v-list justify-center="justify-center">
        <v-toolbar justify-center="justify-center" dark="dark" color="mainColor">
            <v-toolbar-title class="fontSetting">로그인 해주세요.</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="admin.id"></v-text-field>
                <v-text-field
                    prepend-icon="mdi-lock"
                    id="password"
                    name="password"
                    label="Password"
                    v-model="admin.password"
                    type="password"></v-text-field>
            </v-form>
        </v-card-text>
        <v-layout justify-center="justify-center">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="mainColor" @click="findAdmin">로그인</v-btn>
                <v-btn color="mainColor">
                    <router-link to="/CreateAdminPage" class="link">
                        <span class="fontSetting">회원가입</span>
                    </router-link>
                </v-btn>
                <v-btn color="mainColor" @click="backStartPage">뒤로가기</v-btn>
            </v-card-actions>
        </v-layout>
    </v-list>
</template>

<script>
    export default {
        mounted() {
            //for Test
            if (!this.$store.state.admin.AllUsersInfo.map(u => u.id).includes("hostid")) {
                this.$store.state.admin.currentUser.id = "hostid"
                this.$store.state.admin.currentUser.password = "1234"
                this.$store.state.admin.currentUser.userName = "관리자"
                this.$store.state.admin.currentUser.userBirthDay = "2020-12-12"
                this.$store.state.admin.currentUser.startDay = "0000-00-00"
                this
                    .$store
                    .commit("ADD_NEW_USER", this.$store.state.admin.currentUser);
                this.$store.state.admin.currentUser.id = "hostid2"
                this.$store.state.admin.currentUser.password = "1234"
                this.$store.state.admin.currentUser.userName = "관리자2"
                this.$store.state.admin.currentUser.userBirthDay = "2020-12-12"
                this.$store.state.admin.currentUser.startDay = "0000-00-00"
                this
                    .$store
                    .commit("ADD_NEW_USER", this.$store.state.admin.currentUser);
            }
        },
        computed: {
            admin() {
                return this.$store.state.admin.currentUser;
            }
        },
        data() {
            return {email: null, password: null, validationErrors: []};
        },
        methods: {
            findAdmin() {
                this
                    .$store
                    .commit('FIND_USER', this.admin);
                if (this.$store.state.admin.AllClear) {
                    this
                        .$store
                        .commit('CURRENT_USER_SETTING', this.admin);
                    alert("로그인 성공!")
                    this
                        .$router
                        .push({path: '/', params: {}})
                        .catch(() => {})
                    } else if (this.$store.state.admin.ID_or_PasswordError) {
                    alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");
                } else {
                    alert("아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.")
                }
            },
            backStartPage() {
                this
                    .$router
                    .push({path: "/", query: {}})
            }
        }
    };
</script>
<style>
    .fontSetting {
        color: black;
    }
    .LoginForm {
        width: 500px;
    }
    .link {
        width: 100% !important;
        height: 100% !important;
        color: white !important;
        text-decoration: none !important;
    }
</style>