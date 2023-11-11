<script>
    import { admin, user, headerColor } from "$lib/stores";
    import { logout } from '../lib/firebase';
</script>

<div id="dropdown">
    <a href="/account">{$user.displayName}</a>
    <div id="menu">
        {#if $user.admin}
        <button on:click={() => $admin = !$admin}>Admin Toggle ({$admin ? "On" : "Off"})</button>
        {/if}
        <button on:click={logout}>Log out</button>
    </div>
</div>

<style>
    a {
    text-decoration: none;
    font-size: larger;
}
button {
    font-size: medium;
    padding: 1rem;
    background: none;
    border: none;
}
button:hover {
    color: silver;
}
#menu {
    position: absolute;
    background: white;
    padding: 1rem;
    display: none;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    z-index: 1;
}
#dropdown:hover #menu {
  display: flex;
}
#menu > :nth-child(1) {
    display: none;
}
    @media (min-width: 768px) {
        #dropdown {
            position: relative;
            margin-right: 3rem;
        }
        #menu > :nth-child(1) {
            display: initial;
        }
    }
</style>