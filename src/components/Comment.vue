<!--작성된 글을 컴포넌츠화 해서 보여주는 페이지.-->
<template>
    <v-card justify-center="justify-center">
        <v-layout>
            <img class="profileIMGofComment" :src="this.commentUser.profileImage" @click="goAdminOwnPage" alt="">
            <h3>
                &nbsp;
                작성자: 
                {{
                comment.userID
                }}
            </h3>
            <v-spacer></v-spacer>
            <!--바로 삭제가 안되는 문제점... 좀더 고민해보도록 하자.-->
        </v-layout>
        <span class="date">
            {{
                comment.startDate
            }}
            &nbsp;{{
                comment.startTime
            }}
        </span>
        <br>
        <br>
        <v-layout justify-center="justify-center" width="30%"></v-layout>
        <v-card-text>
            {{
                comment.comment
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
            let AllCommentsInfo = this.$store.state.comments.AllComments;
            for(let Comment of AllCommentsInfo){
                if(Comment.id === parseInt(this.childVaule)){
                    this.comment = Comment;
                }
            }
        },
        computed: {
            commentUser(){
                return this.$store.state.admin.AllUsersInfo.find((A) => A.id === this.comment.userID);
            }
        },
        methods: {
            CommentDelete(){
                let CommentID = this.comment.id;
                this.$emit("CommentDelete", CommentID)
            },
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
                comment: ''
            }
        }
    }
</script>
<style>
    .MyCommentIcon {
        background-color: #626262;
        width: 24px;
        height: 24px;
        border-radius: 50px;
    }
    .profileIMGofComment{
        width: 30px;
        height: 30px;
        border-radius: 50px; /* 이미지 반크기만큼 반경을 잡기*/
    }
    .date {
        float: right;
        margin: 1%;
    }
    .IMG {
        width: 30%;
    }
</style>