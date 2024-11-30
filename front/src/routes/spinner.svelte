<style lang="scss">

$alphabg: 0.4;

.spinner
{
    --deg: 0deg;

    position: fixed;

    background: 
    radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0) 100%),
    conic-gradient(
        from var(--deg),
        rgba(238, 130, 238, $alphabg),
        rgba(76, 0, 130, $alphabg),
        rgba(0, 0, 255, $alphabg),
        rgba(0, 128, 0, $alphabg),
        rgba(255, 255, 0, $alphabg),
        rgba(255, 166, 0, $alphabg),
        rgba(255, 0, 0, $alphabg),
        rgba(238, 130, 238, $alphabg)
    ),
    white;

    width: 200vw;
    height: 200vw;

    top: calc(50vh - 100vw);
    left: -50vw;

    animation: rotateBg 15s linear 0s infinite;
    transform-origin: 100vw 100vw;

    opacity: 1;
    transition: opacity 500ms linear;

    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner.hide
{
    opacity: 0;
}

.circle
{
    width: 200px;
    height: 200px;

    border-radius: 100px;
    border-style: dashed;
    border-color: black;
    border-width: 1px;
    // background-color: red;
}

.loading
{
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    color: black;
    font-size: 2em;

    display: flex;
    justify-content: center;
    align-items: center;
    
    opacity: 1;
    transition: opacity 500ms linear;
}

.loading.hide
{
    opacity: 0;
}

@keyframes rotateBg
{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>

<script lang="ts">
    export let show: boolean
</script>

<div class={show ? "spinner" : "spinner hide"}>
    <div class="circle"></div>
</div>

<div class={show ? "loading" : "loading hide"}>
    Loading
</div>
