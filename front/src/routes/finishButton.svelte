<style lang="scss">
    @import './styles/finishButton.scss'
</style>

<script lang="ts">
    import type { QuestionModel } from "$lib/question";
    export let callback = (session : string, content : string, questions : QuestionModel[], curr_question : string) => {};
    export let content;
    export let session;

    export let questions : QuestionModel[] = [];
    export let curr_question : string;
</script>

<div class="button-container">
    <button 
    class="result-button" on:click={
    () => callback(session, content, questions, curr_question)}>
    Find me a new hobby
    </button>
</div>


