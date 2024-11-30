<script>
    import Answer from './answer.svelte';
    import Question from './question.svelte';
    import Button from './finishButton.svelte';
</script>

<style lang="scss">
    @import './styles/styles.scss'
</style>

<div class="main">
    <Question/>
    <Answer/>
    <Button/>
</div>
