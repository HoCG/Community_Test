<!--유저 개인페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card class="AdminOwnWidth">
                <v-spacer></v-spacer>
                <BackToStartPage/>
                <div class="MainFrame">
                    <br>
                    <v-layout>
                        <h2 width="100%">
                            유저아이디:
                            {{
                                this.LoginUser.id
                            }}
                        </h2>
                    </v-layout>
                    <br>
                    <v-layout>
                        <h2 width="100%">
                            유저이름:
                            {{
                                this.LoginUser.userName
                            }}
                        </h2>
                    </v-layout>
                    <br>
                    <v-layout>
                        <h2 width="100%">
                            생일:
                            {{
                                this.LoginUser.userBirthDay
                            }}
                        </h2>
                    </v-layout>
                    <br>
                    <v-layout>
                        <h2 width="100%">
                            가입일:
                            {{
                                this.LoginUser.startDay
                            }}
                        </h2>
                    </v-layout>
                </div>
                <!--여기는 Content를 불러와서 보여주도록 설정하자.-->
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
import BackToStartPage from "../components/BackToStartPage.vue"
export default {
    components: {
        BackToStartPage
    },
    computed:{
        LoginUser(){
            return this.$store.state.admin.currentUser;
        }
    }
}
</script>
<style>
    .MainFrame{
        margin-left: 3%;
        margin-right: 3%;
    }
    .AdminOwnWidth {
        width: 1000px;
    }
</style>