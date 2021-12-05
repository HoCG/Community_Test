<template>
    <v-toolbar color="mainColor">
        <v-layout class="backToStart">
            <v-spacer></v-spacer>
            <v-btn @click="backStartPage()">
                뒤로가기
            </v-btn>
        </v-layout>
    </v-toolbar>
</template>
<script>
    export default {
        methods: {
            backStartPage() {
                this
                    .$router
                    .push({path: "/", query: {}})
            }
        }
    }
</script>
<style></style>