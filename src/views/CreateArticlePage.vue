<!--글 작성 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card justify-center="justify-center" class="CreateArticlePageWidth">
                <BackToStartPage/>
                <div class="MainFrame">
                    <v-spacer></v-spacer>
                    <v-layout class="ArticleTitle" justify-center="justify-center">
                        <v-text-field label="제목" v-model="article.title"></v-text-field>
                    </v-layout>
                    <img :src="image" alt="" width="100%">
                    <v-layout justify-center="justify-center">
                        <v-textarea label="내용" v-model="article.content"></v-textarea>
                    </v-layout>
                    <div>
                        <form method="post" enctype="multipart/form-data">
                            <div>
                                <label for="chooseFile">
                                    upload
                                </label>
                            </div>
                        <input ref="image" @change="uploadImg()" type="file" id="chooseFile" name="chooseFile" accept="image/*">
                        </form>
                    </div>
                    <v-card-actions>
                        <v-btn color="primary" @click="AddArticle">글 등록</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    import BackToStartPage from "../components/BackToStartPage.vue"
    export default {
        components: {
            BackToStartPage
        },
        data() {
            return {image : ''};
        },
        computed: {
            article() {
                this
                    .$store
                    .commit("FORMAT_DATA_ARTICLE");
                return this.$store.state.articles.DataProcessArticle;
            }
        },
        methods: {
            uploadImg() {
                var image = this.$refs['image'].files[0]
                const url = URL.createObjectURL(image)
                this.image = url
                this.$store.state.articles.DataProcessArticle.image = this.image;
            },
            AddArticle() {
                if (String(this.$store.state.articles.DataProcessArticle.title).length > 0) {
                    this.$store.state.articles.DataProcessArticle.userID = this.$store.state.admin.currentUser.id;
                    let today = new Date();   
                    let hours = ('0' + today.getHours()).slice(-2); 
                    let minutes = ('0' + today.getMinutes()).slice(-2);
                    let seconds = ('0' + today.getSeconds()).slice(-2); 
                    let timeString = hours + ':' + minutes  + ':' + seconds;
                    let year = today.getFullYear();
                    let month = ('0' + (today.getMonth() + 1)).slice(-2);
                    let day = ('0' + today.getDate()).slice(-2);
                    let dateString = year + '-' + month  + '-' + day;
                    this.$store.state.articles.DataProcessArticle.startDate = dateString;
                    this.$store.state.articles.DataProcessArticle.startTime = timeString;
                    this
                        .$store
                        .commit("ADD_ARTICLE", this.$store.state.articles.DataProcessArticle);
                    this
                        .$router
                        .push({path: '/', params: {}})
                        .catch(() => {})
                    alert("글 작성이 완료되었어요!");
                } else {
                    alert("제목을 최소 한글자 이상 작성해주세요.");
                }
            }
        }
    }
</script>
<style>
    .CreateArticlePageWidth {
        width: 1000px;
    }
</style>