<script lang="js">
    import {user} from "../lib/stores";
    import LogInButton from "../components/LogInButton.svelte";
    import LogOutButton from "../components/LogOutButton.svelte";

</script>

<div id="top">
    <div class="flex">CreditCardDB</div>
    <nav>
    <a href="/">Home</a>
    <a href="/search">Search</a>
    {#if $user}
        <a href="/contribute">Contribute</a>
    {/if}
    </nav>
    <div id="end" class="flex">
        {#if $user}
            Loged in as {$user.displayName} <LogOutButton></LogOutButton>
        {:else}
            <LogInButton></LogInButton>
        {/if}
    </div>
</div>

<style>
#top {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background: rgb(154, 222, 173);
    margin-bottom: 10px;
}
a {
    border: 1px solid red;
    margin: 3px;
    padding: 3px;
}
</style>

<slot />

