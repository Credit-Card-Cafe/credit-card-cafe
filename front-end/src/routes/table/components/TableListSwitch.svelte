<script lang="ts">
    import { TLS } from "$lib/types";
    export let selection:TLS = TLS.Both;
</script>

<div class="inline-flex flex-row flex-wrap justify-center bg-black/[0.1] dark:bg-black/[0.3] mx-1 rounded-xl lg:rounded-full py-1 lg:py-0 mb-2 lg:mb-0 dark:text-white-warm">

    <input type="radio" id="tls_wallet" name="tls" value={TLS.Wallet} bind:group={selection} class="hidden">
    <label for="tls_wallet" class={`text-center hover:bg-theme-lightgray hover:text-black py-1 px-4 inline-block my-1 transition-all cursor-pointer rounded-full ml-1 ${selection == TLS.Wallet ? "bg-theme-yellow hover:bg-theme-yellow-hov" : ""}`}>Wallet</label>

    <input type="radio" id="tls_both" name="tls" value={TLS.Both} bind:group={selection} class="hidden">
    <label for="tls_both" class={`text-center hover:bg-theme-lightgray hover:text-black py-1 px-4 inline-block my-1 transition-all cursor-pointer rounded-full ${selection == TLS.Both ? "bg-theme-yellow hover:bg-theme-yellow-hov" : ""}`}>Both</label>

    <input type="radio" id="tls_tracking" name="tls" value={TLS.Tracking} bind:group={selection} class="hidden">
    <label for="tls_tracking" class={`text-center hover:bg-theme-lightgray hover:text-black py-1 px-4 inline-block my-1 transition-all cursor-pointer rounded-full mr-1 ${selection == TLS.Tracking ? "bg-theme-yellow hover:bg-theme-yellow-hov" : ""}`}>Tracking</label>
</div>

