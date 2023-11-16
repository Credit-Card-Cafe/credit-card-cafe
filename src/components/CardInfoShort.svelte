<script>
    export let card;
    export let left = false;
</script>

<div id="cis" class={left?"left":"right"}> 
    <b>{card.name}</b>
    <b>{card.bank}</b>
</div>

<style>
    #cis {
        display: flex;
        flex-direction: column;
        align-items: center;
        -webkit-transform:scale(0.9);
        -moz-transform:scale(0.9);
        -ms-transform:scale(0.9);
        transform:scale(0.9);
        background: rgb(253,248,244);
        border:1px solid black;
        width: 323px;
        height: 185px;
        padding: 25px;
    }
    #cis.right {
        border-radius: 0 18px 18px 0;
    }
    #cis.left {
        border-radius: 18px 0 0 18px;
    }
</style>
