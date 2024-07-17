<script lang="ts">
    import { TLS } from "$lib/types";
    export let selection = TLS.Both

</script>

<div class="inline-flex flex-row flex-wrap justify-center bg-black/[0.1] dark:bg-black/[0.3] mx-1 rounded-xl lg:rounded-full py-1 lg:py-0 mb-2 lg:mb-0">

    <input type="radio" id="tls_wallet" name="tls" value={TLS.Wallet} bind:group={selection} class="hidden">
    <label for="tls_wallet" class={`label ml-1 ${selection == TLS.Wallet ? "yellow" : ""}`}>Wallet</label>

    <input type="radio" id="tls_both" name="tls" value={TLS.Both} bind:group={selection} class="hidden">
    <label for="tls_both" class={`label ${selection == TLS.Both ? "yellow" : ""}`}>Both</label>

    <input type="radio" id="tls_tracking" name="tls" value={TLS.Tracking} bind:group={selection} class="hidden">
    <label for="tls_tracking" class={`label mr-1 ${selection == TLS.Tracking ? "yellow" : ""}`}>Tracking</label>
</div>

<style>
    .label {
        @apply text-center py-1 px-4 inline-block my-1 transition-all cursor-pointer rounded-full;
    }
    .label:hover {
        @apply bg-gray-300;
    }
    .yellow {
        @apply bg-amber-200;
    }
    .yellow:hover {
        @apply bg-amber-300;
    }
</style>