<script lang="js">
    import { user } from "../lib/stores";
    import LogInButton from "../components/LogInButton.svelte";
    import LogOutButton from "../components/LogOutButton.svelte";

    function search() {
        let query = document.getElementById("search").value;
        window.alert(`Searching: ${query}`);
    }
</script>

<div id="top">
    <div>
        <div id="title">CreditCardDB</div>
        <nav>
            <a href="/">Home</a>
            <a href="/search">Cards</a>
            {#if $user}
                <a href="/contribute">Contribute</a>
            {/if}
        </nav>
        <form>
            <input type="text" id="search" placeholder="Search cards...">
            <input type="submit" on:click={() => search()}>
        </form>
    </div>
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
    justify-content: space-between;
    justify-items: center;
    background: rgb(151, 255, 238);
    margin-bottom: 10px;
    padding: 10px 20px;
}
#title, nav, form {
    display: inline;
}
#title {
    margin-right: 20px;
}
a {
    border: 1px solid red;
    margin: 3px;
    padding: 3px;
}
:global(body) {
    margin: 0;
}
</style>

<slot />

