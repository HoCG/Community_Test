<!--글 작성 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card width="100%">
                <BackToStartPage/>
                <v-spacer></v-spacer>
                <v-layout class="ContentTitle" justify-center="justify-center">
                    <v-text-field
                        name="제목"
                        label="제목"
                        type="text"
                        v-model="passwordCheck"></v-text-field>
                </v-layout>
                <v-layout justify-center="justify-center">
                    <v-text-field
                        name="내용"
                        label="내용"
                        type="text"
                        v-model="passwordCheck"></v-text-field>
                </v-layout>
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
}
</script>
<style>
</style>