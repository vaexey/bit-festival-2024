<style lang="scss">
    @import './styles/reply.scss'
</style>

<script>
    export let questionResults;  
</script>

<div class="reply-container">
    <ul class="hobbylist">
        {#each questionResults as questionResult}
            <li>{questionResult}</li>
        {/each}
    </ul>
</div>