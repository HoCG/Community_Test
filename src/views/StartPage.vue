<!--맨처음 시작페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card width="100%">
                <v-layout class="createArticleBtn">
                    <v-spacer></v-spacer><!--정렬방법 찾아냄!!! https://electronic-moongchi.tistory.com/21-->
                    <v-btn @click="goCreateArticlePage()">
                        <v-icon color="black"> mdi-pencil</v-icon>
                    </v-btn>
                </v-layout>
                <v-layout max-width="100%" justify-center="justify-center">
                    <h1>
                        Welcome HoCGtagram
                    </h1>
                </v-layout>

                <v-carousel
                    class="carouselStyle"
                    cycle="cycle"
                    hide-delimiter-background="hide-delimiter-background"
                    show-arrows-on-hover="show-arrows-on-hover">
                    <template v-slot:prev="{ on, attrs }">
                        <v-btn color="success" v-bind="attrs" v-on="on">Previous slide</v-btn>
                    </template>
                    <template v-slot:next="{ on, attrs }">
                        <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
                    </template>
                    <!--페이지에 대한 안내를 담은 부분. carousel-item을 활용해서 보여지도록 하였다.-->
                    <v-carousel-item v-for="(color, i) in colors" :key="i">
                        <v-sheet :color="color" height="100%">
                            <v-row class="fill-height" align="center" justify="center">
                                <div class="text-h2">
                                    {{ texts[i] }}
                                </div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
                <v-layout max-width="100%" justify-center="justify-center">
                    <v-icon color="yellow">mdi-star</v-icon>
                    <h3>다른 사람이 작성한 글들</h3>
                    <v-icon color="yellow">mdi-star</v-icon>
                </v-layout>
                <v-card-actions class="justify-center" max-width="100%">
                    <Article
                        class="ArticleMargin"
                        v-for="Article in DataProcessAllarticles"
                        :key="Article.id"
                        v-bind:childVaule="Article.id"
                        @click.native="goThisArticlePage(Article.id)"/>
                    <!--이 컨텐트를 클릭했을때 Article만 따로 보이는 페이지로 넘어가도록 설정해야함. 대신 그때에는 Article 고유의 id를 하나만
                    넘기던가 해서 페이지를 열게끔.-->
                    <!--parentVaule값으로 Article고유 id값을 전달해보는건 어떨까...?-->
                    <!--여기에 v-for로 랜덤으로 저장되어있는 값들중 무작위로 가져와서 글을 보여주도록 한다. 아니면 최근올린 글 순으로 하던지...
                    https://developerjournal.tistory.com/4 << 이 페이지 참조바람.-->
                </v-card-actions>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>

    import saveArticle_Info from "../assets/saveArticle_Info_By_JSON.json"
    import Article from "../components/Article.vue";
    export default {
        mounted() {
            /*
            this
                .$store
                .commit("FORMAT_ALLarticles");
            this.pushData();
            */
            this
                .$store
                .commit("MAKE_RANDOM_ARTICLES");
        },
        computed: {
            DataProcessAllarticles() {
                return this.$store.state.articles.DataProcessAllArticles
            }
        },
        components: {
            Article
        },
        data() {
            return {
                saveArticles: saveArticle_Info.articles,
                parentVaule: 20,
                colors: [
                    'primary', 'secondary', 'yellow darken-2', 'red', 'orange'
                ],
                //텍스트 정보를 배열로 가진다.
                texts: ['이제 너를 마음껏 표현해봐', '다른 사람들과 소통해보자!', 'ㅇ', 'ㅇ', 'ㅇ']
            };
        },
        methods: {
            goCreateArticlePage(){
                //로그인이 됐나 안됐나 확인할 필요가 전무함.
                if(this.$store.state.admin.LoginMode){
                    this
                    .$router
                    .push({path: '/CreateArticlePage'})
                    .catch(() => {})
                }
                else{
                    this
                    .$router
                    .push({path: '/LoginPage'})
                    .catch(() => {})
                }
            },
            pushData() {
                for (let Article of this.saveArticles) {
                    this.$store.state.articles.DataProcessArticle.id = parseInt(Article.id);
                    this.$store.state.articles.DataProcessArticle.userID = String(Article.userID);
                    this.$store.state.articles.DataProcessArticle.title = String(Article.title);
                    this.$store.state.articles.DataProcessArticle.content = String(Article.content);
                    //console.log(this.$store.state.articles.currentArticle);
                    this
                        .$store
                        .commit("ADD_ARTICLE", this.$store.state.articles.DataProcessArticle);
                }
            },
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
    .text-h2 {
        font-weight: 700 !important;
    }
    .carouselStyle{
        width: 1000px;
    }
    .ArticleMargin {
        cursor: pointer;
        margin-left: 3%;
        margin-right: 3%;
    }
    h1 {
        /*글자에 그라디에이션 주는 효과*/
        font-size: 60px;
        background: linear-gradient(to right top, #861657, #ffa69e);
        color: transparent;
        -webkit-background-clip: text;
    }
    .createArticleBtn{
         float: right;
    }
</style>