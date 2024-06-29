<script lang="ts">
    import { convertJSONtoUser } from "$lib/functions";
    import { localUserData } from "$lib/stores";
    import type { BankType } from "$lib/types";
    import { beforeUpdate } from "svelte";
    export let bank:BankType;

    $: localUser = convertJSONtoUser($localUserData);
    let localUserModifiers: string[] = []

    beforeUpdate(() => {
        if (localUser.modifiers) {
            localUserModifiers = localUser.modifiers
        }
    })

    function addModifierToUser(modifierId: string) {
        if (localUser["modifiers"]) {
            localUser["modifiers"].push(modifierId);
        } else {
            localUser["modifiers"] = [modifierId]
        }
        $localUserData = JSON.stringify(localUser)
        console.log(localUser["modifiers"])
    }

    function rmModifierFromUser(modifierId: string) {
        if (localUser["modifiers"]) {
            localUser["modifiers"] = localUserModifiers.filter(modId => modId !== modifierId);
        }
        $localUserData = JSON.stringify(localUser)
        console.log(localUser["modifiers"])
    }
</script>

{#if bank.modifiers}
    {#each Object.entries(bank.modifiers) as [modifierId, modifierName]}
        {#if localUserModifiers.includes(modifierId)}
        <button on:click={() => rmModifierFromUser(modifierId)} class="m-2 p-2 bg-green-500 dark:text-gray-900 text-alt hover:bg-green-600 rounded-md inline-flex flex-row items-center">{modifierName}</button>
        {:else}
        <button on:click={() => addModifierToUser(modifierId)} class="m-2 p-2 bg-black/[0.1] hover:bg-black/[0.4] rounded-md inline-flex flex-row items-center">{modifierName}</button>
        {/if}
    {/each}
{/if}