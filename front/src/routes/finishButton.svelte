<style lang="scss">
    @import './styles/finishButton.scss'
</style>

<script lang="ts">
    export let callback = (session : string) => {};
    export let session : string;
</script>

<div class="button-container">
    <button 
    on:click={
        () => callback(session)}
    class="result-button">
    Get result
    </button>
</div>