<script>
    import Answer from './answer.svelte';
    import Question from './question.svelte';
    import FinishButton from './finishButton.svelte';
    import AnswerTile from './answerTile.svelte';
    import Reply from './reply.svelte';
    import ContinueButton from './keepAskingButton.svelte';

    const iterations = Array.from({ length: 9 }, (_, i) => i + 1);
    let questionResults =[];
</script>

<style lang="scss">
    @import './styles/styles.scss'
</style>

<div class="main">
    {#if questionResults.length === 0}
    <Question/>
    <div class="tiles-container" data-length={iterations.length}>
        {#each iterations as iteration}
        <AnswerTile iteration={iteration}/>
        {/each}
    </div>
    <Answer/>    
    <FinishButton/>
    {:else}
    <Reply {questionResults}/>
    <ContinueButton/>
    {/if}
</div>
