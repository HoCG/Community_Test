<!--컨텐츠를 눌렀을때 그 컨텐츠 하나만 확인하는 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card class="ArticleDetailWidth">
                <BackToStartPage/>
                <div class="MainFrame">
                    <v-spacer></v-spacer>
                    <br>
                    <v-layout class="ArticleWriter">
                        <v-spacer></v-spacer>
                        <v-btn v-if="MyArticleCheck" @click="UpdateArticle">
                            <v-icon>mdi-pencil</v-icon>
                            <span>수정하기</span>
                        </v-btn>
                    </v-layout>
                    <v-layout class="ArticleWriter">
                        <v-spacer></v-spacer>
                        <v-btn v-if="MyArticleCheck" @click="DeleteArticle">
                            <v-icon>mdi-delete</v-icon>
                            <span>삭제하기</span>
                        </v-btn>
                    </v-layout>
                    <br>
                    <br>
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
                        <v-img class="profileIMG" :src="this.writingUser.profileImage" @click="goAdminOwnPage" alt="" width="30px" height="30px"></v-img>
                        <v-list-item-title>작성자: {{
                                this.article.userID
                            }}</v-list-item-title>
                    </v-layout>
                    <br>
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
                        <span > 좋아요 {{
                                this.article.HeartCount
                            }}&nbsp;</span>
                        <v-icon color="grey" @click="ShowCommentMode">mdi-comment</v-icon>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <br>
                    <br>
                    <v-layout width="100%" v-if="CommentMode">
                        <v-textarea label="댓글을 달아주세요!" v-model="comment.comment"></v-textarea>
                        <v-btn @click="AddComment">댓글등록</v-btn>
                    </v-layout>
                    <br>
                    <!--만약 내가 작성한 댓글이고 로그인을 한 상태라면 >> 자연스럽게 x로 된 삭제버튼이 나오도록 구성하면 될듯.-->
                    <Comment
                        @CommentDelete="CommentDelete"
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
            this
                .$store
                .commit("FIND_ARTICLE_COMMENTS", this.$store.state.articles.currentArticle.id); //댓글정보와
            this
                .$store
                .commit("FIND_ARTICLE", this.$store.state.articles.currentArticle.id); //현재 글정보를 데이터화해놓는다.
            //코드가 완전 더럽지만... 좋아요를 했는지 안했는지 확인하는 절차라고 생각하면 됨.
            let HeartBtn = document.getElementById("HeartBtn");
            let HeartArr = this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartLike //좋아요한 정보를 가지고온다.
            if (HeartArr.includes(String(this.$store.state.admin.currentUser.id))) { //현재 글을 찾아내고
                HeartBtn.style.color = "red";
            } else if (HeartArr.includes(String(this.$store.state.admin.currentUser.id))) {
                HeartBtn.style.color = "grey";
            }
            if(this.$store.state.admin.currentUser.id === this.$store.state.articles.currentArticle.userID){
                this.MyArticleCheck = true;
            }
            else{
                this.MyArticleCheck = false;
            }
        },
        data() {
            return {
                CommentMode: false,
                MyArticleCheck: false,
                getComment: ''
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
            },
            writingUser(){
                return this.$store.state.admin.AllUsersInfo.find((A) => A.id === this.$store.state.articles.currentArticle.userID);
            }
        },
        components: {
            Comment,
            BackToStartPage
        },
        methods: {
            LikeClick() {
                let HeartBtn = document.getElementById("HeartBtn");
                let HeartArr = this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartLike
                if (this.$store.state.admin.LoginMode) {
                    //현재 로그인한 유저가 하트를 눌렀는지 확인
                    if (!HeartArr.includes(String(this.$store.state.admin.currentUser.id))) { //현재 글을 찾아내고
                        this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartLike.push(String(this.$store.state.admin.currentUser.id)); //현재 글의 하트배열에 유저의 정보를 넣는다.
                        this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartCount++;
                        HeartBtn.style.color = "red";
                    } else if (HeartArr.includes(String(this.$store.state.admin.currentUser.id))) {
                        this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartLike = 
                        this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartLike
                            .filter(H => String(H) !== String(this.$store.state.admin.currentUser.id));
                        this.$store.state.articles.AllArticles.find((A) => parseInt(A.id) === this.$store.state.articles.currentArticle.id).HeartCount--;
                        HeartBtn.style.color = "grey";
                    }
                } else {
                    alert("로그인 후에 이용해주세요!");
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
                let month = ('0' + (today.getMonth() + 1)).slice(-2);
                let day = ('0' + today.getDate()).slice(-2);
                let dateString = year + '-' + month + '-' + day;
                let hours = ('0' + today.getHours()).slice(-2);
                let minutes = ('0' + today.getMinutes()).slice(-2);
                let seconds = ('0' + today.getSeconds()).slice(-2);
                let timeString = hours + ':' + minutes + ':' + seconds;
                this.$store.state.comments.Comment.startDate = dateString;
                this.$store.state.comments.Comment.startTime = timeString;
                this.$store.state.comments.Comment.userID = this.$store.state.admin.currentUser.id;
                this.$store.state.comments.Comment.articleID = this.$store.state.articles.currentArticle.id;
                this
                    .$store
                    .commit("ADD_COMMENT", this.$store.state.comments.Comment);
            },
            goAdminOwnPage(){

            },
            UpdateArticle(){
                this.$store.state.articles.ArticleUpdateMode = true;
                this
                    .$router
                    .push({path: '/CreateArticlePage'})
                    .catch(() => {})
            },
            DeleteArticle(){
                this
                    .$store
                    .commit("DELETE_ARTICLE", this.$store.state.articles.currentArticle);
                alert("해당 게시물이 삭제되었습니다!")
                this.$router.go(-1);
            },
            CommentDelete(CommentID){
                this
                    .$store
                    .commit("DELETE_COMMENT", CommentID);
            },
            DeleteCheck(CommentID){
                if(this.$store.comments.AllComments.map(c => c.id).includes(CommentID)){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
</script>
<style>
    .btnSetting{
        float: left;
    }
    .profileIMG{
        border-radius: 50px; /* 이미지 반크기만큼 반경을 잡기*/
    }
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