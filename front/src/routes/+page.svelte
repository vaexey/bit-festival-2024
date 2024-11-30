<script lang="ts">
    import Answer from './answer.svelte';
    import Question from './question.svelte';
    import Button from './finishButton.svelte';
    import { onMount } from 'svelte';

    type QuestionStage = "ASKED" | "ANSWERERD" | "RATED";
    interface QuestionModel {
           stage: QuestionStage
           //
           // Stage ASKED
           question: string
           options: string[]
           shortOptions: string[]

           // Stage ANSWERED
           answer?: string

           // Stage RATED
           result?: string
           accuracy?: number

    }
    let question1 : QuestionModel;

    onMount(async () => {
        let res = await fetch("api/questions?session=1");
        let body = res.body;
        console.log(body);

    });

</script>

<style lang="scss">
    @import './styles/styles.scss'
</style>

<div class="main">
    <Question/>
    <Answer/>
    <Button/>
</div>
