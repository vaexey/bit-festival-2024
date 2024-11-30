<script lang="ts">
    export let value = '';  
    import type { QuestionModel } from "$lib/question";  
    export let callback = (session : string, content : string, questions : QuestionModel[], curr_question : string) => {};
    export let content;
    export let session;

    export let questions : QuestionModel[] = [];
    export let curr_question : string;
</script>

<style lang="scss">
    @import './styles/answer.scss';

</style>

<div class="answer-container">
    <textarea 
    bind:value={value}
    class="answ-input">
    </textarea>
    <button class="answ-button" on:click={
        () => callback(session, content, questions, curr_question)}>➤</button>
    </div>


