<template>
    <v-card>
        <v-list-item-title>
            테스트
        </v-list-item-title>
        <v-card-text>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    //데이터들을 하나하나 넘겨줄지, 아니면 게시글 아이디를 넘겨주면 그 아이디를 통해 vuex에 연결하여 데이터를 찾아올지 생각해봐야할듯.
    name: "Content",
    props: ["ContentVaule"]
}
</script>
<style>

</style>