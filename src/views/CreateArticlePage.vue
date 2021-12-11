<!--글 작성 페이지.-->
<template>
    <v-list justify-center="justify-center">
        <BackToStartPage/>
                <div class="MainFrame">
                    <v-spacer></v-spacer>
                    <v-layout class="ArticleTitle" justify-center="justify-center">
                        <v-text-field label="제목" v-model="article.title"></v-text-field>
                    </v-layout>
                    <img :src="image" alt="" width="100%">
                    <v-layout>
                        <div class="image-upload">
                            <label for="image-input">
                                <v-icon size="15px" color="black">mdi-camera</v-icon>
                            </label>
                            <input ref="image" @change="uploadImg()" type="file" id="image-input" accept="image/*">
                        </div>
                        <span>
                             &nbsp; 
                            Image</span>
                    </v-layout>
                    <v-layout justify-center="justify-center">
                        <v-textarea label="내용" v-model="article.content"></v-textarea>
                    </v-layout>
                    <v-layout justify-center="justify-center">
                        <v-card-actions justify-center="justify-center">
                            <v-btn width="500" color="mainColor" v-if="!checkUpdate" @click="AddArticle">
                                <h3>
                                    글 등록
                                </h3>
                            </v-btn>
                            <v-btn width="500" color="mainColor" v-else-if="checkUpdate" @click="UpdateArticle">
                                <h3>
                                    글 수정
                                </h3>
                            </v-btn>
                        </v-card-actions>
                    </v-layout>
                </div>
                <Alert :dialog="true" />
    </v-list>
</template>
<script>
    import Alert from "../components/AlertForm.vue";
    import BackToStartPage from "../components/BackToStartPage.vue"
    export default {
        components: {
            Alert,
            BackToStartPage
        },
        mounted(){
            if(this.$store.state.articles.ArticleUpdateMode){
                this.checkUpdate = true;
            }
            else if(!this.$store.state.articles.ArticleUpdateMode){
                this.checkUpdate = false;
            }
        },
        data() {
            return {
                checkUpdate: false,
                image : ''};
        },
        computed: {
            article() {
                /*
                this
                    .$store
                    .commit("FORMAT_DATA_ARTICLE");
                */
                return this.$store.state.articles.currentArticle;
            }
        },
        methods: {
            uploadImg() {
                var image = this.$refs['image'].files[0]
                const url = URL.createObjectURL(image)
                this.image = url
                this.$store.state.articles.currentArticle.image = this.image;
            },
            UpdateArticle(){
                if (String(this.$store.state.articles.currentArticle.title).length > 0) {
                    let today = new Date();   
                    let hours = ('0' + today.getHours()).slice(-2); 
                    let minutes = ('0' + today.getMinutes()).slice(-2);
                    let seconds = ('0' + today.getSeconds()).slice(-2); 
                    let timeString = hours + ':' + minutes  + ':' + seconds;
                    let year = today.getFullYear();
                    let month = ('0' + (today.getMonth() + 1)).slice(-2);
                    let day = ('0' + today.getDate()).slice(-2);
                    let dateString = year + '-' + month  + '-' + day;
                    this.$store.state.articles.currentArticle.startDate = dateString;
                    this.$store.state.articles.currentArticle.startTime = timeString;
                    this
                        .$store
                        .commit("UPDATE_ARTICLE", this.$store.state.articles.currentArticle);
                    this
                        .$store
                        .commit("OPEN_ALERT_PAGE_OVER_MODE", "글 수정이 완료되었어요!");
                    this.$store.state.articles.ArticleUpdateMode = false;
                    this
                        .$store
                        .commit("FORMAT_DATA_ARTICLE");
                } else {
                    this
                        .$store
                        .commit("OPEN_ALERT", "제목을 최소 한글자 이상 작성해주세요.");
                }
            },
            AddArticle() {
                if (String(this.$store.state.articles.currentArticle.title).length > 0) {
                    this.$store.state.articles.currentArticle.userID = this.$store.state.admin.currentUser.id;
                    let today = new Date();   
                    let hours = ('0' + today.getHours()).slice(-2); 
                    let minutes = ('0' + today.getMinutes()).slice(-2);
                    let seconds = ('0' + today.getSeconds()).slice(-2); 
                    let timeString = hours + ':' + minutes  + ':' + seconds;
                    let year = today.getFullYear();
                    let month = ('0' + (today.getMonth() + 1)).slice(-2);
                    let day = ('0' + today.getDate()).slice(-2);
                    let dateString = year + '-' + month  + '-' + day;
                    this.$store.state.articles.currentArticle.startDate = dateString;
                    this.$store.state.articles.currentArticle.startTime = timeString;
                    this
                        .$store
                        .commit("ADD_ARTICLE", this.$store.state.articles.currentArticle);
                    this
                        .$store
                        .commit("OPEN_ALERT_PAGE_OVER_MODE", "글 작성이 완료되었어요!");
                    this
                        .$store
                        .commit("FORMAT_DATA_ARTICLE");
                } else {
                    this
                        .$store
                        .commit("OPEN_ALERT", "제목을 최소 한글자 이상 작성해주세요.");
                }
            }
        }
    }
</script>
<style>
    .image-upload{
        background-color: #CCCCCC;
        border-radius: 50px;
        height: 25px;
        width: 25px;
        
    }
    .image-upload>label {
        margin-left: 20%;
        justify-content: center;
        vertical-align: middle;
        width: 100%
    }
    .image-upload>input {
        display: none;
    }
    .MainFrame{
        margin-left: 3%;
        margin-right: 3%;
        margin-bottom: 3%;
    }
    .CreateArticlePageWidth {
        width: 1000px;
    }
</style>