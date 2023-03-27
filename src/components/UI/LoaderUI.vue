<template>
    <div class="loader">
        <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: "LoaderUI"
}
</script>

<style>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 50px auto;
}
</style>