<template>
    <v-card justify-center="justify-center" width="50%">
        <v-layout justify-center="justify-center">
            <h3 width="100%">
                {{
                    article.title
                }}
            </h3>
        </v-layout>
        <v-layout justify-center="justify-center">
            <v-card-text>
                {{
                    article.content
                }}
            </v-card-text>
        </v-layout>
        <v-layout justify-center="justify-center" width="30%">
            <img class="IMG" :src="article.image" alt="">
        </v-layout>
            <!--좋아요와 댓글기능 추가해보자.-->
    </v-card>
</template>
<script>
    export default {
        name: "ChildComponent",
        props: ["childVaule"],
        mounted() {
            let AllArticlesInfo = this.$store.state.articles.AllArticles;
            for(let Article of AllArticlesInfo){
                if(Article.id === parseInt(this.childVaule)){
                    this.article = Article;
                }
            }
        },
        methods: {},
        data(){
            return{
                article: ''
            }
        }
    }
</script>
<style>
    .IMG {
        width: 30%;
    }
</style>