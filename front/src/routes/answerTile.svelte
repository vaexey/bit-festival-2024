<style lang="scss">
    @import './styles/answerTile.scss'
</style>

<script lang="ts">
    export let iteration; 
    import type { QuestionModel } from "$lib/question";  
    export let callback = (session : string, content : string, questions : QuestionModel[], curr_question : string) => {};
    export let session;
    export let tooltip;

    export let questions : QuestionModel[] = [];
    export let curr_question : string;

</script>

<div class="tile-button" on:click={
        () => callback(session, iteration, questions, curr_question)}>{iteration}
    <div class="tip">
        <div class="text">
            {tooltip}
        </div>
    </div>
</div>
