<!--맨처음 시작페이지.-->
<template justify-center="justify-center">
    <v-list justify-center="justify-center">
        <v-layout class="createArticleBtn">
            <v-spacer></v-spacer>
            <!--정렬방법 찾아냄!!! https://electronic-moongchi.tistory.com/21-->
            <v-btn @click="goCreateArticlePage()">
                <v-icon color="black">
                    mdi-pencil</v-icon>
            </v-btn>
        </v-layout>
        <h1>
            Welcome HoCGtagram
        </h1>
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
            <v-carousel-item v-for="carousel in carouselArr" :key="carousel.id">
                <v-sheet :color="carousel.color" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-img :src="carousel.imageURL" max-width="400"></v-img>
                        <div class="text-h2">
                            {{
                                carousel.text
                            }}
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
    </v-list>
</template>
<script>

    import saveArticle_Info from "../assets/saveArticle_Info_By_JSON.json"
    import Article from "../components/Article.vue";
    export default {
        mounted() {
            this
                .$store
                .commit("MAKE_RANDOM_ARTICLES");
        },
        computed: {
            DataProcessAllarticles() {
                return this.$store.state.articles.AllArticles
            }
        },
        components: {
            Article
        },
        data() {
            return {
                carouselArr: [
                    {
                        id: 0,
                        color: 'primary',
                        text: '이제 너를 마음껏 표현해봐',
                        imageURL: require("../assets/carousel_Image_1.png")
                    },
                    {
                        id: 1,
                        color: 'secondary',
                        text: '다른 사람과 자유롭게 소통해봐!',
                        imageURL: require("../assets/carousel_Image_2.png")
                    },
                    {
                        id: 2,
                        color: 'yellow darken-2',
                        text: '지금 너의 상태를 언제든지!',
                        imageURL: require("../assets/logo.png")
                    }
                ],
                saveArticles: saveArticle_Info.articles
            };
        },
        methods: {
            goCreateArticlePage() {
                //로그인이 됐나 안됐나 확인할 필요가 전무함.
                if (this.$store.state.admin.LoginMode) {
                    this
                        .$router
                        .push({path: '/CreateArticlePage'})
                        .catch(() => {});
                    this
                        .$store
                        .commit("FORMAT_DATA_ARTICLE");
                } else {
                    this
                        .$router
                        .push({path: '/LoginPage'})
                        .catch(() => {})
                    }
            },
            pushData() {
                for (let Article of this.saveArticles) {
                    this.$store.state.articles.currentArticle.id = parseInt(Article.id);
                    this.$store.state.articles.currentArticle.userID = String(Article.userID);
                    this.$store.state.articles.currentArticle.title = String(Article.title);
                    this.$store.state.articles.currentArticle.content = String(Article.content);
                    //console.log(this.$store.state.articles.currentArticle);
                    this
                        .$store
                        .commit("ADD_ARTICLE", this.$store.state.articles.currentArticle);
                }
            },
            goThisArticlePage(ArticleID) {
                //ID전달을 쿼리가 아닌, vuex로 처리하는거지.
                this
                    .$store
                    .commit("FIND_ARTICLE", ArticleID);
                this
                    .$store
                    .commit("FIND_ARTICLE_COMMENTS", ArticleID);
                this
                    .$router
                    .push({path: '/ArticleDetailPage'})
                    .catch(() => {})
                }
        }
    }
</script>
<style>
    .mainImage {
        width: 20%;
    }
    .MainFrame {
        margin-left: 3%;
        margin-right: 3%;
        margin-bottom: 3%;
    }
    .text-h2 {
        font-weight: 700 !important;
    }
    .carouselStyle {
    }
    .ArticleMargin {
        cursor: pointer;
        margin-left: 3%;
        margin-right: 3%;
    }
    h1 {
        /*글자에 그라디에이션 주는 효과*/
        text-align: center;
        font-size: 60px;
        background: linear-gradient(to right top, #861657, #ffa69e);
        color: transparent;
        -webkit-background-clip: text;
    }
    .createArticleBtn {
        float: right;
    }
</style>