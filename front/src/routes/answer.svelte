<script>
    export let value = '';
</script>

<style lang="scss">
    @import './styles/answer.scss';

</style>

<div class="answer-container">
    <textarea 
    bind:value={value}
    class="answ-input">
    </textarea>
    <button class="answ-button">➤</button>
</div>


