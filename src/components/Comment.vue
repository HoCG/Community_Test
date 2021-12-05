<!--작성된 글을 컴포넌츠화 해서 보여주는 페이지.-->
<template>
    <v-card justify-center="justify-center"  width="50%">
        <v-layout justify-center="justify-center">
            <h3>
                {{
                comment.userID
                }}
            </h3>
        </v-layout>
        <v-layout justify-center="justify-center" width="30%">
        </v-layout>
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
        computed: {
            comment() {
                let AllCommentsInfo = this.$store.state.comments.AllComments;
                return AllCommentsInfo[parseInt(this.childVaule)];
            }
        },
        methods: {}
    }
</script>
<style>
    .IMG{
        width: 30%;
    }
</style>