<style lang="scss">
    @import './styles/theme.scss'
</style>

<script lang="ts">
    export let theme : boolean;

</script>

<div class="theme-container">
    <div class={theme ? "theme" : "theme dark"} on:click={() => {theme=!theme}}>
        {theme ?  '☀': '☽'}
    </div>
</div>
