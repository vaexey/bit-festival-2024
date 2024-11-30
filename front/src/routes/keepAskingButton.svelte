<style lang="scss">
    @import './styles/keepAskingButton.scss'
</style>

<script lang="ts">
    export let callback = () => {};
</script>

<div class="continueButton-container">
    <button class="continueButton-button"
    on:click={() => callback()}
    >Look for a better answer</button>
</div>
