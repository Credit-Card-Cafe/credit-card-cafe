<script lang="js">
	export let card;
    import { dataField } from "../lib/fields";
</script>

<div id="card">
    {#each Object.keys(card) as prop}
        {#if prop != "url"}
            {#if typeof card[prop] == "object"}
                {#each Object.keys(card[prop]) as propprop}
                <div id="{propprop}"><span class="name">{dataField[prop]["data"][propprop].name}: </span><span class="prop">{card[prop][propprop]}</span></div>
                {/each}
            {:else}
                <div id="{prop}"><span class="name">{dataField[prop].name}: </span><span class="prop">{card[prop]}</span></div>
            {/if}
        {/if}
    {/each}
    <a href="/contribute/update/{card.url}">Update Information</a>
</div>

<style>
    #bank {
        background: rgb(201, 255, 201);
    }
    #name {
        background: rgb(201, 255, 242);
    }
    #network {
        background: rgb(201, 225, 255);
    }
    #annual-fee {
        background: rgb(211, 201, 255);
    }
</style>

