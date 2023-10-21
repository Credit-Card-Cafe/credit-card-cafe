<script lang="js">
    import { user } from "../lib/stores";
    import LogInButton from "../components/LogInButton.svelte";
    import LogOutButton from "../components/LogOutButton.svelte";
    import { headerColor } from "../lib/stores";

    function search() {
        let query = document.getElementById("search").value;
        window.alert(`Searching: ${query}`);
    }


</script>

<div id="top" style={`background:${$headerColor}`}>
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
    margin-bottom: 4rem;
    padding: 1rem 2rem;
}
#title, nav, form {
    display: inline;
}
#title {
    margin-right: 2rem;
}
a {
    text-decoration: none;
    color: black;
    margin: .5rem;
    padding: .70rem;
    font-size: 1rem;
}
a:hover {
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
}
:global(body) {
    margin: 0;
}
</style>

<slot />

