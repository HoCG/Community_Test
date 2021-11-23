<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card width="100%">
                <h1>
                    Welcome HoCGtagram
                </h1>
                <v-layout max-width="100%" justify-center="justify-center">
                    <h3>다른 사람이 작성한 글들</h3>
                    <!--여기에 v-for로 랜덤으로 저장되어있는 값들중 무작위로 가져와서 글을 보여주도록 한다.
                    아니면 최근올린 글 순으로 하던지...-->
                    <v-card-actions class="justify-center" max-width="100%">
                        
                    </v-card-actions>
                </v-layout>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
    export default {}
</script>
<style>
    h1 {
        /*글자에 그라디에이션 주는 효과*/
        font-size: 60px;
        background: linear-gradient(to right top, #861657, #ffa69e);
        color: transparent;
        -webkit-background-clip: text;
    }
</style>