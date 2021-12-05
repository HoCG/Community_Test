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
                    <v-card-actions class="justify-center" max-width="100%">
                        <MyArticle
                            class="ArticleMargin"
                            v-for="article in DataProcessAllArticles"
                            :key="article.id"
                            v-bind:childVaule="article.id"
                            @click.native="goThisArticlePage(article.id)"/>
                    </v-card-actions>
                </div>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
import BackToStartPage from "../components/BackToStartPage.vue"
import MyArticle from "../components/MyArticle.vue";
export default {
    mounted() {
        this
            .$store
            .commit("FIND_MY_ALL_ARTICLES", this.$store.state.admin.currentUser.id)
    },
    components: {
        BackToStartPage,
        MyArticle
    },
    computed: {
        DataProcessAllArticles() {
            return this.$store.state.articles.DataProcessAllArticles
        },
        LoginUser() {
            return this.$store.state.admin.currentUser;
        }
    },
    methods: {
         goThisArticlePage(ArticleID) {
                //ID전달을 쿼리가 아닌, vuex로 처리하는거지.
                this
                    .$store
                    .commit("FIND_ARTICLE", ArticleID);
                this
                    .$router
                    .push({path: '/ArticleDetailPage'})
                    .catch(() => {})
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