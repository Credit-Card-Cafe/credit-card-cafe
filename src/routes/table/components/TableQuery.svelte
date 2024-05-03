<script lang="ts">
    export let field:string;
    export let queries:Array<string>;
    export let isObject:boolean = false;
    export let object:string | undefined = undefined;
    import { dataField } from "$lib/fields";
    
    $: isChecked = queries.includes(field);

    function addQuery() {
        if(!isChecked){
            queries = [...queries, field]
        } else {
            queries = queries.filter((query) => query !== field)
        }
    }

</script>

{#if object}
    <input id={`query${object + field}`} class="hidden" type="checkbox" value={dataField[object]["data"][field].name} on:change={() => addQuery()}>
    <label for={`query${object + field}`} class={`label ${isChecked ? "grn dark:text-gray-900 text-alt" : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"}`}>{dataField[object]["data"][field].name}</label> 
{:else if isObject}
    <div class={`flex flex-row flex-wrap justify-center ${isChecked ? "bg-black/[0.1] dark:bg-black/[0.3] mx-1 rounded-xl lg:rounded-full py-1 lg:py-0" : ""}`}>
    <input id={`query${field}`} class="hidden" type="checkbox" value={field} on:change={() => addQuery()}>
    <label for={`query${field}`} class={`label ${isChecked ? "blu dark:text-gray-900 text-alt" : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"}`}>{dataField[field].name}</label>
    {#if isChecked} 
        {#each Object.keys(dataField[field]["data"]) as f}
            <svelte:self field={f} object={field} bind:queries={queries}/>
        {/each}
    {/if}
    </div>
{:else}
    <input id={`query${field}`} class="hidden" type="checkbox" value={field} on:change={() => addQuery()}>
    <label for={`query${field}`} class={`label ${isChecked ? "grn dark:text-gray-900 text-alt" : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"}`}>{dataField[field].name}</label>
{/if}

<style>
.label {
    @apply text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-all cursor-pointer;
}
.objlabel {
    @apply text-center py-0.5 px-3 rounded-full inline-block mx-1 my-1 transition-all cursor-pointer;
}
.grn {
    @apply bg-green-500 ;
}
.grn:hover{ 
    @apply bg-green-600;
}  
.blu {
    @apply bg-blue-500;
}
.blu:hover{
    @apply bg-blue-600;
}
</style>