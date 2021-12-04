<!--글 작성 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card justify-center="justify-center" class="CreateContentPageWidth">
                <BackToStartPage/>
                <div class="MainFrame">
                    <v-spacer></v-spacer>
                    <v-layout class="ContentTitle" justify-center="justify-center">
                        <v-text-field label="제목" v-model="content.title"></v-text-field>
                    </v-layout>
                    <img :src="image" alt="" width="100%">
                    <v-layout justify-center="justify-center">
                        <v-textarea label="내용" v-model="content.content"></v-textarea>
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
                        <v-btn color="primary" @click="AddContent">글 등록</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    import BackToStartPage from "../components/BackToStartPage.vue"
    export default {
        mounted: {
            //로그인 모드가 아니라면 강제로 해당페이지에 벗어나도록 설정하자.
        },
        components: {
            BackToStartPage
        },
        data() {
            return {image : ''};
        },
        computed: {
            content() {
                this
                    .$store
                    .commit("FORMAT_DATACONTENT");
                return this.$store.state.contents.DataProcessContent;
            }
        },
        methods: {
            uploadImg() {
                console.log('들어왔다')
                var image = this.$refs['image'].files[0]
                const url = URL.createObjectURL(image)
                this.image = url
                this.$store.state.contents.DataProcessContent.image = this.image;
                console.log(url)
                console.log(this.image)
            },
            AddContent() {
                if (String(this.$store.state.contents.DataProcessContent.title).length > 0) {
                    this.$store.state.contents.DataProcessContent.userID = this.$store.state.admin.currentUser.id;
                    let today = new Date();   
                    let hours = ('0' + today.getHours()).slice(-2); 
                    let minutes = ('0' + today.getMinutes()).slice(-2);
                    let seconds = ('0' + today.getSeconds()).slice(-2); 
                    let timeString = hours + ':' + minutes  + ':' + seconds;
                    let year = today.getFullYear();
                    let month = ('0' + (today.getMonth() + 1)).slice(-2);
                    let day = ('0' + today.getDate()).slice(-2);
                    let dateString = year + '-' + month  + '-' + day;
                    this.$store.state.contents.DataProcessContent.startDate = dateString;
                    this.$store.state.contents.DataProcessContent.startTime = timeString;
                    this
                        .$store
                        .commit("ADD_CONTENT", this.$store.state.contents.DataProcessContent);
                    this
                        .$router
                        .push({path: '/', params: {}})
                        .catch(() => {})
                    console
                        .log(this.$store.state.contents.AllContents);
                    alert("글 작성이 완료되었어요!");
                } else {
                    alert("제목을 최소 한글자 이상 작성해주세요.");
                }
            }
        }
    }
</script>
<style>
    .CreateContentPageWidth {
        width: 1000px;
    }
</style>