<!--컨텐츠를 눌렀을때 그 컨텐츠 하나만 확인하는 페이지.-->
<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card width="100%">
                <v-list-item-title>
                {{
                    this.content.content
                }}
                </v-list-item-title>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    export default {
        computed: {
            content(){
                this.$store.commit("FIND_CONTENT", this.$route.query.ID);
                console.log(this.$store.state.contents.currentContent);
                return this.$store.state.contents.currentContent;
            }
        }
    }
</script>   
<style></style>