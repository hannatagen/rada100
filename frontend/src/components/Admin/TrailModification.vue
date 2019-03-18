<template>
    <div>
        {{trailId}}
    </div>
</template>

<script>

    export default {
        name: "TrailModification",
        data() {
            return {
                trailId: ''
            };
        },
        mounted() {
            this.trailId = this.$store.state.modifyTrailId;
        }
    }
</script>

<style scoped>

</style>
