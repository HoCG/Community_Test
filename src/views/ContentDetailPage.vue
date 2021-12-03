<!--컨텐츠를 눌렀을때 그 컨텐츠 하나만 확인하는 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card width="100%">
                <!--
                <v-toolbar color="indigo" dark="dark">
                    <v-layout class="backToStart">
                        <v-spacer></v-spacer>
                        <v-btn @click="backStartPage()">
                            뒤로가기
                        </v-btn>
                    </v-layout>
                </v-toolbar>
                -->
                <BackToStartPage/>
                <v-spacer></v-spacer>
                <v-layout class="ContentTitle" justify-center="justify-center">
                    <h2 width="100%">
                        {{
                            this.content.title
                        }}
                    </h2>
                </v-layout>
                <v-layout justify-center="justify-center">
                    <v-list-item-title>
                        {{
                            this.content.content
                        }}
                    </v-list-item-title>
                </v-layout>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    import BackToStartPage from "../components/BackToStartPage.vue"
    export default {
        computed: {
            content() {
                // 새로고침하니까 자꾸 데이터가 다날라가는데... 이문제 해결을 위해 라우터를 통해 데이터를 받기보단 vuex내에서 저장하고 해결하는 식으로
                // 해야할듯?
                return this.$store.state.contents.currentContent;
            }
        },
        components: {
            BackToStartPage
        }
    }
</script>
<style>
    .backToStart {
        margin-left: 20%;
        width: 100%;
        display: flex;
        justify-content: center;
        float: right;
    }
</style>