<script lang="ts">
    import Answer from './answer.svelte';
    import Question from './question.svelte';
    import Button from './finishButton.svelte';
    import { onMount } from 'svelte';
    import { type QuestionModel } from '$lib/question'
    import { new_session, get_questions } from '$lib/api';

    const send_answer = async (session : string, content : string) => {
        await fetch(`api/answer?session=${session}&content=${content}`);
        questions = await get_questions(session);
        curr_question = questions.length > 0 ? questions[questions.length- 1].question : "...";
    };

    let questions : QuestionModel[] = $state([]);
    let curr_question : string = $state('');
    let session : string = $state('');
    let content = $state('');


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
    <Question bind:text={curr_question}/>

    <Answer bind:value={content}/>

    <Button 
    callback={send_answer}
    session={session} 
    content={content}
    bind:questions={questions}
    bind:curr_question={curr_question}
    />

</div>

