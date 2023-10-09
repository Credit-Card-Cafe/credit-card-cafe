<!--Homepage-->
<script lang="js">
	import { cardList } from '../lib/firebase';
  let cards = [];
  cardList.then(list => {
    cards = list
    });
</script>

<div>Welcome to Credit Card DB</div>
<div>Here you can find advanced details about credit cards</div>

{#each cards as card}
  <a href="/card/{card.url}">
    <span>{card.bank}</span> -
    <span>{card.name}</span>
  </a><br>
{/each}