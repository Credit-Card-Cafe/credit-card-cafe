<script lang="js">
    import { user, admin } from "../../../lib/stores";
    import { addBank } from "../../../lib/firebase";
    import { goto } from '$app/navigation';

    let submitted = true;
    let nicknames = [];
    let name = "";
    let url = "";
    let tempBank = {};

    function submit() {
        if ($user) {
            if (name == "") {
                console.log("Something went wrong...")
            } else {
                addBank(tempBank).then(() => {
                    submitted = false;
                    goto(`/bank/${url}`)
                });
            }
            
        }
        else {
            window.alert("Must be logged in to submit")
        }
    }

    function setBank(){
        url = name.replace(/ /g, '').toLowerCase().substring(0,20);
        tempBank["name"] = name;
        tempBank["url"] = url;
        if (name == "") {
            delete tempBank["name"];
            delete tempBank["url"];
        }
    }

    function setNicknames(value, index) {
        if (value.length != 0) {
            nicknames[index] = value;
        } else {
            nicknames.splice(index, 1);
            render = nicknames.length;
        }
        tempBank["nicknames"] = nicknames.filter((name) => name != 0);
        if (nicknames.length == 0 && tempCard["nicknames"].length == 0) {
            delete tempCard["nickname"];
        }
    }

    function addField() {
        nicknames = [...nicknames, ""];
        render = nicknames.length;
    }

    let render = nicknames.length;
</script>

<svelte:head>
    <title>CreditCardDB | Add Card</title>
</svelte:head>

{#if submitted}
    <div id="form">
        <div>Couldn't find a bank? Add it here.</div>
        <div class={name == "" ? 'undef' : ''}>Bank <input bind:value={name} on:input={() => setBank()} required></div>
        <div id="nicknames">
            <div>Nicknames</div>
            {#key render}
                {#each nicknames as name, i}
                    <div class="element">
                        <input type="text" bind:value={name} on:input={() => setNicknames(name, i)}>
                    </div>
                {/each}
            {/key}
            <button on:click={() => addField()}>Add Nickname</button>
        </div>
        <button disabled={name == "" ? true : false} on:click={submit}>Add Bank</button>
    </div>
        {#if $admin}
        <div>
            <pre>bank: {name}</pre>
            <pre>nicknames: {JSON.stringify(nicknames)}</pre>
            <pre>{JSON.stringify(tempBank,null,1)}</pre>
        </div>
        {/if}
{:else}
<div>
    Loading...
</div>
{/if}


<style>
    #form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #form > div {
        border-radius: 5px;
        padding: 2rem;
        margin-bottom: 0.75rem;
    }
    .undef {
        border: 1px solid red;
    }
    .element {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>