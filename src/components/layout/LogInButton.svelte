<script lang="ts">
    import { logIn } from '$lib/firebase';
	

	function setUser() {
        logIn();
		
	}
</script>

<button class="dark:text-white-warm p-4" on:click={setUser}>
	Log in
</button>

