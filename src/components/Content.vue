<!--작성된 글을 컴포넌츠화 해서 보여주는 페이지.-->
<template>
    <v-card>
        <v-layout justify-center="justify-center">
            <h3>
                {{
                content.title
                }}
            </h3>
        </v-layout>
        <v-card-text>
            {{
                content.content
            }}
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        //데이터들을 하나하나 넘겨줄지, 아니면 게시글 아이디를 넘겨주면 그 아이디를 통해 vuex에 연결하여 데이터를 찾아올지 생각해봐야할듯.
        name: "ChildComponent",
        props: ["childVaule"],
        computed: {
            content() {
                let AllContentsInfo = this.$store.state.contents.AllContents;
                return AllContentsInfo[parseInt(this.childVaule)];
            }
        },
        methods: {}
    }
</script>
<style></style>