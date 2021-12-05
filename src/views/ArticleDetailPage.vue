<!--컨텐츠를 눌렀을때 그 컨텐츠 하나만 확인하는 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card class="ArticleDetailWidth">
                <BackToStartPage/>
                <div class="MainFrame">
                    <v-spacer></v-spacer>
                    <v-layout class="ArticleTitle" justify-center="justify-center">
                        <h2 width="100%">
                            {{
                                this.article.title
                            }}
                        </h2>
                    </v-layout>
                    <br>
                    <br>
                    <v-layout class="ArticleWriter" justify-center="justify-center">
                        <v-spacer></v-spacer>
                        <span>작성자: {{
                                this.article.userID
                            }}</span>
                    </v-layout>
                    <br>
                    <v-layout class="ArticleWriter" justify-center="justify-center">
                        <v-spacer></v-spacer>
                        <span>작성일: {{
                                this.article.startDate + this.article.startTime
                            }}</span>
                    </v-layout>
                    <br>
                    <br>
                    <img :src="article.image" alt="" width="100%">
                    <br>
                    <v-layout justify-center="justify-center">
                        <v-list-item-title>
                            {{
                                this.article.content
                            }}
                        </v-list-item-title>
                    </v-layout>
                    <br>
                    <v-layout justify-center="justify-center">
                        <v-icon @click="LikeClick">mdi-heart</v-icon>
                        <v-icon @click="ShowCommentMode">mdi-comment</v-icon>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout v-if="CommentMode">
                        <v-textarea label="댓글을 달아주세요!" v-model="comment.comment"></v-textarea>
                        <v-btn @click="AddComment">댓글등록</v-btn>
                    </v-layout>
                    <v-layout v-if="CommentMode">
                        <Comment
                            v-for="comment in ArticleComments"
                            :key="comment.id"
                            v-bind:childVaule="comment.id"/>
                    </v-layout>
                </div>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    import BackToStartPage from "../components/BackToStartPage.vue";
    import Comment from "../components/Comment.vue";
    export default {
        mounted() {
            this.$store.commit("FIND_ARTICLE_COMMENTS", this.$store.state.articles.currentArticle.id);
        },
        data(){
            return {
                CommentMode: false
            }
        },
        computed: {
            comment(){
                return this.$store.state.comments.Comment;
            },
            article() {
                // 새로고침하니까 자꾸 데이터가 다날라가는데... 이문제 해결을 위해 라우터를 통해 데이터를 받기보단 vuex내에서 저장하고 해결하는 식으로
                // 해야할듯?
                return this.$store.state.articles.currentArticle;
            },
            ArticleComments() {
                return this.$store.state.comments.ArticleComments;
            }
        },
        components: {
            Comment,
            BackToStartPage
        },
        methods: {
            LikeClick(){

            },
            ShowCommentMode(){
                this.CommentMode = true;
            },
            AddComment(){
                this.$store.commit("ADD_COMMENT", this.comment, this.article.id);
            }
        }
    }
</script>
<style>
    .ArticleWriter {
        float: right;
    }
    .ArticleDetailWidth {
        width: 1000px;
    }
    .backToStart {
        margin-left: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        float: right;
    }
</style>