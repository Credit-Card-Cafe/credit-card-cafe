<script lang="ts">
    import { onMount } from "svelte";
    export let tag = "Scroll to explore cards!"

    onMount(() => {
        let origin = document.getElementById("scrollBouncy")!.getBoundingClientRect().bottom;
        document.addEventListener("scroll", (e) => {
            document.getElementById("scrollBouncy")!.style.opacity = `${(100-window.scrollY)/100}`
        });
    })
    
</script>

<slot></slot>
<div id="scrollBouncy" class="text-xl font-semibold text-center absolute bottom-4 left-0 right-0 mx-auto group-hover:animate-bounce">
    {tag}
</div>
