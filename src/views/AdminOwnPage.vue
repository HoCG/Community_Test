<!--유저 개인페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card class="AdminOwnWidth">
                <v-spacer></v-spacer>
                <BackToStartPage/>
                <br>
                <v-img :src="this.UserInfo.backgroundImage" alt="" width="100%" height="600px">
                    <br>
                    <div class="MainFrame">
                        <v-layout v-if="CheckLoginMode">
                            <v-spacer></v-spacer>
                            <div class="image-upload">
                                <label for="background-input">
                                    <v-icon size="15px" color="black">mdi-camera</v-icon>
                                </label>
                                <input ref="backgroundIMG" @change="uploadBackgroundIMG()" type="file" id="background-input" accept="image/*">
                            </div>
                            <span>
                                &nbsp; 
                                BackGround-Image
                                &nbsp;
                            </span>
                        </v-layout>
                        <v-layout class="profileIMG">
                            <v-img class="profileIMG" :src="this.UserInfo.profileImage" width="100px" alt=""></v-img>
                        </v-layout>
                        <v-layout v-if="CheckLoginMode">
                            <div class="image-upload">
                                <label for="profile-input">
                                    <v-icon size="15px" color="black">mdi-camera</v-icon>
                                </label>
                                <input ref="profileIMG" @change="uploadProfileIMG()" type="file" id="profile-input" accept="image/*">
                            </div>
                            <span>
                                &nbsp; 
                                Profile-Image</span>
                        </v-layout>
                        <v-layout>    
                            <h2 width="100%">
                                유저아이디:
                                {{
                                    this.UserInfo.id
                                }}  
                            </h2>
                        </v-layout>
                        <br>
                        <v-layout>
                            <h2 width="100%">
                                유저이름:
                                {{
                                    this.UserInfo.userName
                                }}
                            </h2>
                        </v-layout>
                        <br>
                        <v-layout>
                            <h2 width="100%">
                                생일:
                                {{
                                    this.UserInfo.userBirthDay
                                }}
                            </h2>
                        </v-layout>
                        <br>
                        <v-layout>
                            <h2 width="100%">
                                가입일:
                                {{
                                    this.UserInfo.startDay
                                }}
                            </h2>
                        </v-layout>
                    </div>
                    </v-img>
                <v-card-actions class="justify-center" max-width="100%">
                        <MyArticle
                            class="ArticleMargin"
                            v-for="article in DataProcessAllArticles"
                            :key="article.id"
                            v-bind:childVaule="article.id"
                            @click.native="goThisArticlePage(article.id)"/>
                </v-card-actions>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    import BackToStartPage from "../components/BackToStartPage.vue"
    import MyArticle from "../components/MyArticle.vue";
    export default {
        data() {
            return {
                profileIMG: '', 
                backgroundIMG: '', 
                CheckLoginMode: false
            };
        },
        mounted() {
            this
                .$store
                .commit("FIND_MY_ALL_ARTICLES", this.$store.state.admin.TheUser_usedByData.id);
            if(this.$store.state.admin.currentUser.id === this.$store.state.admin.TheUser_usedByData.id){
                this.CheckLoginMode = true;
            }
            else{
                this.CheckLoginMode = false;
            }
        },
        components: {
            BackToStartPage,
            MyArticle
        },
        computed: {
            DataProcessAllArticles() {
                return this.$store.state.articles.DataProcessAllArticles
            },
            UserInfo() {
                return this.$store.state.admin.TheUser_usedByData;
            }
        },
        methods: {
            uploadProfileIMG() {
                let image = this
                    .$refs['profileIMG']
                    .files[0];
                const url = URL.createObjectURL(image);
                this.profileIMG = url
                this.$store.state.admin.TheUser_usedByData.profileImage = this.profileIMG;
                this
                    .$store
                    .commit("UPDATE_USER_INFO", this.$store.state.admin.TheUser_usedByData);
            },
            uploadBackgroundIMG() {
                let image = this
                    .$refs['backgroundIMG']
                    .files[0];
                const url = URL.createObjectURL(image);
                this.backgroundIMG = url
                this.$store.state.admin.TheUser_usedByData.backgroundImage = this.backgroundIMG;
                this
                    .$store
                    .commit("UPDATE_USER_INFO", this.$store.state.admin.TheUser_usedByData);
            },
            goThisArticlePage(ArticleID) {
                //ID전달을 쿼리가 아닌, vuex로 처리하는거지.
                this
                    .$store
                    .commit("FIND_ARTICLE", ArticleID);
                this
                    .$router
                    .push({path: '/ArticleDetailPage'})
                    .catch(() => {});
                }
        }
    }
</script>
<style>
    .image-upload{
        cursor: pointer;
        background-color: #CCCCCC;
        border-radius: 50px;
        height: 25px;
        width: 25px;
        
    }
    .setting{
        cursor: pointer;
        background-color: #CCCCCC;
        border-radius: 50px;
        height: 25px;
        width: 25px;
    }
    .setting>i{
        margin-left: 20%;
    }
    .image-upload>label {
        cursor: pointer;
        margin-left: 20%;
        justify-content: center;
        vertical-align: middle;
        width: 100%
    }
    .image-upload>input {
        display: none;
    }
    #chooseFile{
        background-image: url("../assets/camera.png") no-repeat;
        height: 25px;
        width: 25px;
        border-radius: 50px;
    }
    .profileIMG{
        width: 100px;
        height:100px;
        border-radius: 50px; /* 이미지 반크기만큼 반경을 잡기*/
    }
    .MainFrame{
        margin-left: 3%;
        margin-right: 3%;
    }
    .AdminOwnWidth {
        width: 1000px;
    }
</style>