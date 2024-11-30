<script>
    import Answer from './answer.svelte';
    import Question from './question.svelte';
    import Button from './finishButton.svelte';
    import AnswerTile from './answerTile.svelte';

    const iterations = Array.from({ length: 9 }, (_, i) => i + 1);
</script>

<style lang="scss">
    @import './styles/styles.scss'
</style>

<div class="main">
    <Question/>
    <div class="tiles-container" data-length={iterations.length}>
        {#each iterations as iteration}
        <AnswerTile iteration={iteration}/>
        {/each}
    </div>
    <Answer/>
    <Button/>
</div>
