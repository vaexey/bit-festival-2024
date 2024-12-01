<style lang="scss">
    @import './styles/reply.scss'
</style>

<script>
    export let questionResults;  
</script>

<div class="title">Best hobbies for you:</div>
<div class="reply-container">
    {#each questionResults as questionResult}
            <div>{questionResult}</div>
    {/each}
</div>