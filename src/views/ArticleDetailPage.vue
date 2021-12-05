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
                                this.article.startDate
                            }}&nbsp;
                            {{
                                this.article.startTime
                            }}
                            </span>
                    </v-layout>
                    <br>
                    <br>
                    <img :src="article.image" alt="" width="100%">
                    <br>
                    <v-layout justify-center="justify-center">
                        <v-card width="100%">
                            <v-list-item-title class="ArticleContent">
                                {{
                                    this.article.content
                                }}
                            </v-list-item-title>
                        </v-card>
                    </v-layout>
                    <br>
                    <v-layout justify-center="justify-center">
                        <v-icon id="HeartBtn" @click="LikeClick">mdi-heart</v-icon>
                        <v-icon color="grey" @click="ShowCommentMode">mdi-comment</v-icon>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout v-if="CommentMode">
                        <v-textarea label="댓글을 달아주세요!" v-model="comment.comment"></v-textarea>
                        <v-btn @click="AddComment">댓글등록</v-btn>
                    </v-layout>
                    <Comment
                            v-for="comment in this.$store.state.comments.ArticleComments"
                            :key="comment.id"
                            v-bind:childVaule="comment.id"/>
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
            this.$store.commit("FIND_ARTICLE_COMMENTS", this.$store.state.articles.currentArticle.id); //댓글정보와
            this.$store.commit("FIND_DATA_ARTICLE", this.$store.state.articles.currentArticle.id); //현재 글정보를 데이터화해놓는다.
        },
        data() {
            return {
                CommentMode: false,
                HeartArr: this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartLike
            }
        },
        computed: {
            comment() {
                return this.$store.state.comments.Comment;
            },
            article() {
                // 새로고침하니까 자꾸 데이터가 다날라가는데... 이문제 해결을 위해 라우터를 통해 데이터를 받기보단 vuex내에서 저장하고 해결하는 식으로
                // 해야할듯?
                return this.$store.state.articles.currentArticle;
            }
        },
        components: {
            Comment,
            BackToStartPage
        },
        methods: {
            LikeClick() {
                let HeartBtn = document.getElementById("HeartBtn");
                console.log(this.HeartArr);
                if(this.$store.state.admin.LoginMode){
                    //현재 로그인한 유저가 하트를 눌렀는지 확인
                    if(!this.HeartArr.includes(String(this.$store.state.admin.currentUser.id))){ //현재 글을 찾아내고
                        this.HeartArr.push(String(this.$store.state.admin.currentUser.id)); //현재 글의 하트배열에 유저의 정보를 넣는다.
                        HeartBtn.style.color = "red";
                    }
                    //안눌렀다면
                    else if(this.HeartArr.includes(String(this.$store.state.admin.currentUser.id))){
                        this.HeartArr = this.HeartArr.filter(H => String(H) !== String(this.$store.state.admin.currentUser.id));
                        console.log("클릭상태");
                        console.log(this.HeartArr);
                        HeartBtn.style.color = "grey";
                    }
                }
                else{
                    alert("로그인 후에 이용해주세요!")
                }
            },
            ShowCommentMode() {
                this
                    .$store
                    .commit("FIND_ARTICLE_COMMENTS", this.$store.state.articles.currentArticle.id);
                this.CommentMode = !this.CommentMode;
            },
            AddComment() {
                let today = new Date();
                let year = today.getFullYear();
                let month = ('0' + (
                    today.getMonth() + 1
                )).slice(-2);
                let day = ('0' + today.getDate()).slice(-2);
                let dateString = year + '-' + month + '-' + day;
                let hours = ('0' + today.getHours()).slice(-2); 
                let minutes = ('0' + today.getMinutes()).slice(-2);
                let seconds = ('0' + today.getSeconds()).slice(-2); 
                let timeString = hours + ':' + minutes  + ':' + seconds;
                this.$store.state.comments.Comment.startDate = dateString;
                this.$store.state.comments.Comment.startTime = timeString;
                this.$store.state.comments.Comment.userID = this.$store.state.admin.currentUser.id;
                this.$store.state.comments.Comment.articleID = this
                    .$store
                    .state
                    .articles
                    .currentArticle
                    .id;
                this.$store.commit("ADD_COMMENT", this.$store.state.comments.Comment);
            }
        }
    }
</script>
<style>
    .ArticleContent{
        margin-top: 3%;
        margin-left: 3%;
        margin-right: 3%;
        margin-bottom: 3%;
    }
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