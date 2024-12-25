<script lang="ts">
    import { COP } from "$lib/types";

    export let field:COP;
    export let queries:COP[];
    export let cardName
    export let useAcronyms;

    import { localUserData } from "$lib/stores";
    import { convertJSONtoUser } from "$lib/functions";
    let localUser = convertJSONtoUser($localUserData)
    
    $: isChecked = queries.includes(field);

    function addQuery() {
        if(!isChecked){
            queries = [...queries, field]
        } else {
            queries = queries.filter((query) => query !== field)
        }
        localUser.table_setting_queries = queries;
        $localUserData = JSON.stringify(localUser)
    }

</script>
    
{#key useAcronyms}
<input id={`query${field}`} class="hidden" type="checkbox" value={field} on:change={() => addQuery()}>
<label for={`query${field}`} class={`text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-colors cursor-pointer 
${isChecked ? 
"bg-theme-green hover:bg-theme-green-hov text-theme-black" : 
"bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov"
}`}>{cardName(field)}</label>
{/key}
