<!--로그인 페이지-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card>
                <v-toolbar dark="dark" color="primary">
                    <v-toolbar-title>로그인 해주세요.</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="mdi-account" name="login" label="Login" type="text" v-model="admin.id">
                        </v-text-field>
                        <v-text-field
                            prepend-icon="mdi-lock" 
                            id="password"
                            name="password"
                            label="Password"
                            v-model="admin.password"
                            type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="findAdmin">로그인</v-btn>
                    <v-btn color="primary">
                        <router-link to="/NewAdmin" class="link">회원가입</router-link>
                    </v-btn>
                    <v-btn color="primary" @click="backStartPage">뒤로가기</v-btn>
                </v-card-actions>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>

<script>
    export default {
        mounted() {
            //for Test
            this.$store.state.admin.currentUser.id = "ghtp9705"
            this.$store.state.admin.currentUser.password = "2412ghtp"
            this.$store.commit("ADD_NEW_USER", this.$store.state.admin.currentUser);
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
            findAdmin(){
                this.$store.commit('FIND_USER', this.admin);
                if(this.$store.state.admin.AllClear){
                    alert("로그인 성공!")
                }
                else if(this.$store.state.admin.ID_or_PasswordError){
                    alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");
                }
                else{
                    alert("아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.")
                }
            },
            backStartPage(){
                this
                .$router
                .push({
                    path: "/",
                    query: {
                    }
                })
            }
        }
    };
</script>
<style>
    .link {
        width: 100% !important;
        height: 100% !important;
        color: white !important;
        text-decoration: none !important;
    }
</style>