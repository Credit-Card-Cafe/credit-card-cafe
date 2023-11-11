<script lang="js">
    import { logIn } from '../lib/firebase';
	

	function setUser() {
        logIn();
		
	}
</script>

<button on:click={setUser}>
	Log in
</button>

<style>
	button {
		padding: 1rem;
		background: none;
		border: 1px solid black;
		border-radius: 5px;
	}
</style>
