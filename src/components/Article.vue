<!--작성된 글을 컴포넌츠화 해서 보여주는 페이지.-->
<template>
    <v-card justify-center="justify-center"  width="50%">
        <v-toolbar color="mainColor">
            <v-layout>
                <v-img class="profileIMG" :src="this.writingUser.profileImage" @click="goAdminOwnPage" alt="" width="30px" height="30px"></v-img>
                <v-list-item-title>
                    &nbsp;
                    {{
                        this.writingUser.id
                    }}
                </v-list-item-title>
            </v-layout>
        </v-toolbar>
        <v-layout>
            <h3>&nbsp;&nbsp;
                Title: 
                {{
                    this.article.title
                }}
            </h3>
        </v-layout>
        <v-layout width="30%">
            <img class="IMG" :src="article.image" alt="">
        </v-layout>
        <v-card-text>
            {{
                this.article.content
            }}
        </v-card-text>
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
            this.writingUser = this.$store.state.admin.AllUsersInfo.find((A) => A.id === this.article.userID);
        },
        methods: {
            goAdminOwnPage(){
                this.$store.state.admin.TheUser_usedByData = this.writingUser;
                this
                    .$router
                    .push({path: '/AdminOwnPage', params: {}})
                    .catch(() => {});
            },
        },
        data(){
            return{
                writingUser: '',
                article: ''
            }
        }
    }
</script>
<style>
    .profileIMG{
        border-radius: 50px; /* 이미지 반크기만큼 반경을 잡기*/
    }
    .IMG{
        width: 30%;
    }
</style>