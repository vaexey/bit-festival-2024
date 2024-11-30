<script lang="ts">
    import FinishButton from './finishButton.svelte';
    import AnswerTile from './answerTile.svelte';
    import Reply from './reply.svelte';
    import ContinueButton from './keepAskingButton.svelte';
    import Answer from './answer.svelte';
    import Question from './question.svelte';
    import { onMount } from 'svelte';
    import { type QuestionModel } from '$lib/question'
    import { new_session, get_questions } from '$lib/api';
    type Result = {
        result : string,
        accuracy : number
    };

    const send_answer = async (session : string, content : string) => {
        curr_question = "Loading...";
        await fetch(`api/answer?session=${session}&content=${content}`);
        questions = await get_questions(session);
        curr_question = questions.length > 0 ? questions[questions.length- 1].question : "...";
    };

    export const get_results = async (session : string) => {
        let res = await fetch(`/api/results?session=${session}`);
        let results = JSON.parse(await res.text()).map((obj : Result) => obj.result);
        let len = Math.min(3, results.length);
        questionResults = results.slice(0, len);
    }

    let questions : QuestionModel[] = $state([]);
    let curr_question : string = $state('');
    let session : string = $state('');
    let content = $state('');
    let questionResults : string[] = $state([]);


    onMount(async () => {
        if(!session) {
            session = await new_session();
        }
        questions = await get_questions(session);
        curr_question = questions.length > 0 ? questions[questions.length- 1].question : "...";
    });

</script>

<style lang="scss">
    @import './styles/styles.scss'
</style>

<div class="main">
    {#if questionResults.length === 0}
    <Question bind:text={curr_question}/>
    {#if questions.length > 0 && questions[questions.length - 1].shortOptions !== undefined}

    <div class="tiles-container" data-length={questions[questions.length - 1].shortOptions.length}>
            {#each questions[questions.length - 1].shortOptions as iteration}
                <AnswerTile 
                iteration={iteration}
                callback={send_answer}
                session={session}
                bind:questions={questions}
                bind:curr_questions={curr_question}
                />
            {/each}
    </div>
    {/if}
    <Answer 
        bind:value={content} 
        callback={send_answer}
        session={session} 
        content={content}
        bind:questions={questions}
        bind:curr_question={curr_question}/>
    <FinishButton 
        callback={get_results}
        session={session}/>
    {:else}
    <Reply {questionResults}/>
    <ContinueButton/>
    {/if}
</div>

