<script lang="ts">
    import { COP } from "$lib/types";

    export let field:COP;
    export let queries:COP[];
    
    $: isChecked = queries.includes(field);

    function addQuery() {
        if(!isChecked){
            queries = [...queries, field]
        } else {
            queries = queries.filter((query) => query !== field)
        }
    }

</script>
    <input id={`query${field}`} class="hidden" type="checkbox" value={field} on:change={() => addQuery()}>
    <label for={`query${field}`} class={`label ${isChecked ? "grn dark:text-gray-900 text-alt" : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"}`}>{field}</label>
<style>
.label {
    @apply text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-colors cursor-pointer;
}
.objlabel {
    @apply text-center py-0.5 px-3 rounded-full inline-block mx-1 my-1 transition-colors cursor-pointer;
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