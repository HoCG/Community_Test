<template>
    <v-layout max-width="100%" justify-center="justify-center">
        <v-card-actions class="justify-center" max-width="100%">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field prepend-icon="mdi-account" name="login" label="Login" type="text" v-model="admin.id">
                        </v-text-field>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-card-actions>
    </v-layout>
</template>
<script>
export default {
    //중복검사를 요구하며
    //모든 내용을 기입했는지를 확인해야하고
    //비밀번호를 양식에 맞게 잘 작성했는지를 확인해야한다.
}
</script>
<style>

</style>