<script lang="ts">
    import type { BrandObject } from "$lib/types";
    export let brand:BrandObject;

</script>

<div id="bankInfo" class="lg:mx-6 flex flex-1 flex-col items-center lg:block">
    {#if brand.brand_name}
        <div class="inline-flex flex-col items-center mb-12">
            <div class="pb-8 text-6xl lg:text-8xl text-center font-semibold dark:text-theme-text-white">{brand.brand_name}</div>
            <hr class="my-4 border-2 border-theme-text-white w-11/12 ">
        </div>
    {/if}

</div>
