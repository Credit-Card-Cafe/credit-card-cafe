<script lang="js">
    import { logIn } from '../lib/firebase';
	

	function setUser() {
        logIn();
		
	}
</script>

<button on:click={setUser}>
	Log in
</button>
