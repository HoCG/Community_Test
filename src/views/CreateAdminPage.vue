<!--회원가입 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card>
                <v-card-text>회원가입</v-card-text>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            prepend-icon="mdi-account"
                            name="ID"
                            label="ID"
                            type="text"
                            v-model="admin.id"></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-lock"
                            name="password"
                            label="password"
                            type="password"
                            v-model="admin.password"></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-lock"
                            name="password check"
                            label="password check"
                            type="password"
                            v-model="passwordCheck"></v-text-field>
                        <v-text-field
                            prepend-icon="mdi-account"
                            name="Name"
                            label="Name"
                            type="text"
                            v-model="admin.name"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="NewAdminCheck">
                        회원가입
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
            this
                .$store
                .commit("FORMAT_USER_INFO");
        },
        computed: {
            admin() {
                return this.$store.state.admin.currentUser;
            }
        },
        data() {
            return {passwordCheck: ""}
        },
        methods: {
            passwordOverlapCheck(password, passwordCheck) {
                if (password === passwordCheck) {
                    return true;
                } else {
                    return false;
                }
            },
            passwordUniquenessCheck(id, password) {
                if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
                    alert('숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.');
                    return false;
                }
                let checkNumber = password.search(/[0-9]/g);
                let checkEnglish = password.search(/[a-z]/ig);
                if (checkNumber < 0 || checkEnglish < 0) {
                    alert("숫자와 영문자를 혼용하여야 합니다.");
                    return false;
                }
                if (/(\w)\1\1\1/.test(password)) {
                    alert('444같은 문자를 4번 이상 사용하실 수 없습니다.');
                    return false;
                }
                if (password.search(id) > -1) {
                    alert("비밀번호에 아이디가 포함되었습니다.");
                    return false;
                }
                return true;
            },
            NewAdminCheck() {
                if (this.passwordOverlapCheck(this.admin.password, this.passwordCheck)) {
                    if (this.passwordUniquenessCheck(this.admin.id, this.admin.password)) {
                        this
                            .$store
                            .commit("ADD_NEW_USER", this.admin);
                        this
                            .$router
                            .push({path: "/", query: {}})
                    }
                }
            },
            backStartPage() {
                this
                    .$router
                    .push({path: "/", query: {}})
            }
        }
    }
    //중복검사를 요구하며 모든 내용을 기입했는지를 확인해야하고 비밀번호를 양식에 맞게 잘 작성했는지를 확인해야한다.
</script>
<style></style>