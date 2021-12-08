<!--작성된 글을 컴포넌츠화 해서 보여주는 페이지.-->
<template>
    <v-card justify-center="justify-center" width="100%">
        <v-layout>
            <v-img></v-img>
            <h3>
                &nbsp;
                작성자: 
                {{
                comment.userID
                }}
            </h3>
            <v-spacer></v-spacer>
            <!--바로 삭제가 안되는 문제점... 좀더 고민해보도록 하자.-->
            <button @click="CommentDelete" class="MyCommentIcon"><v-icon>mdi-close</v-icon></button>
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
        methods: {
            CommentDelete(){
                let CommentID = this.comment.id;
                this.$emit("CommentDelete", CommentID)
            }
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
    .date {
        float: right;
        margin: 1%;
    }
    .IMG {
        width: 30%;
    }
</style>