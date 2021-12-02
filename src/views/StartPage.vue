<!--맨처음 시작페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card width="100%">
                <!--
                <v-layout max-width="100%" class="LoginCheckLayout">
                    <v-btn v-if="checkLoginMode()" target="_blank" text="text">
                        <span class="mr-2">Welcome
                            {{this.adminID}}</span>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-btn
                        v-else-if="!checkLoginMode()"
                        @click="goLoginPage()"
                        target="_blank"
                        text="text">
                        <span class="mr-2">Login</span>
                        <v-icon>mdi-lock</v-icon>
                    </v-btn>
                </v-layout>
                -->
                <v-layout max-width="100%" justify-center="justify-center">
                    <h1>
                        Welcome HoCGtagram
                    </h1>
                </v-layout>
                <v-layout max-width="100%" justify-center="justify-center">
                    <h3>다른 사람이 작성한 글들</h3>
                </v-layout>
                <v-card-actions class="justify-center" max-width="100%">
                    <!--이 for문은 지금 동작하지 않는다. 데이터를 필요로함.-->
                    <Content
                        v-for="Content in randomContents"
                        :key="Content.id"
                        v-bind:childVaule="Content.id"
                        @click.native="goThisContentPage(Content.id)"/>
                    <!--이 컨텐트를 클릭했을때 Content만 따로 보이는 페이지로 넘어가도록 설정해야함. 대신 그때에는 Content 고유의 id를 하나만
                    넘기던가 해서 페이지를 열게끔.-->
                    <!--parentVaule값으로 content고유 id값을 전달해보는건 어떨까...?-->
                    <!--여기에 v-for로 랜덤으로 저장되어있는 값들중 무작위로 가져와서 글을 보여주도록 한다. 아니면 최근올린 글 순으로 하던지...
                    https://developerjournal.tistory.com/4 << 이 페이지 참조바람.-->
                </v-card-actions>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>

    import saveContent_Info from "../assets/saveContent_Info_By_JSON.json"
    import Content from "../components/Content.vue";
    export default {
        /*
        mounted() {
            this
                .$store
                .commit("MAKE_RANDOM_CONTENTS");
        },
        */
        computed: {
            randomContents() {
                //let currentContent = this.$store.state.content.currentContent
                this.pushData();
                this
                    .$store
                    .commit("MAKE_RANDOM_CONTENTS");
                //console.log(this.$store.state.contents.randomContents);
                return this.$store.state.contents.randomContents
            }
        },
        components: {
            Content
        },
        data() {
            return {saveContents: saveContent_Info.contents, parentVaule: 20};
        },
        methods: {
            /*
            checkLoginMode() {
                if (this.$store.state.admin.LoginMode) {
                    return true;
                } else {
                    return false;
                }
            },
            goLoginPage() {
                this
                    .$router
                    .push({path: '/LoginPage', params: {}})
                    .catch(() => {})
            },
            */
            pushData() {
                for (let content of this.saveContents) {
                    this.$store.state.contents.currentContent.id = parseInt(content.id);
                    this.$store.state.contents.currentContent.userID = String(content.userID);
                    this.$store.state.contents.currentContent.title = String(content.title);
                    this.$store.state.contents.currentContent.content = String(content.content);
                    //console.log(this.$store.state.contents.currentContent);
                    this
                        .$store
                        .commit("ADD_CONTENT", this.$store.state.contents.currentContent);
                }
            },
            goThisContentPage(ContentID) {
                this
                    .$router
                    .push({
                        path: '/ContentDetailPage',
                        query: {
                            ID: ContentID
                        }
                    })
                    .catch(() => {})
                }
        }
    }
</script>
<style>
    h1 {
        /*글자에 그라디에이션 주는 효과*/
        font-size: 60px;
        background: linear-gradient(to right top, #861657, #ffa69e);
        color: transparent;
        -webkit-background-clip: text;
    }
    .LoginCheckLayout {
        float: right;
    }
</style>