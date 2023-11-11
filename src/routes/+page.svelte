<!--Homepage-->
<svelte:head>
  <title>CreditCardDB</title>
</svelte:head>

<script lang="js">
  import "./global.css";
</script>

<div id="home">
  <div class="title">Welcome to Credit Card DB</div>
  <div>Here you can find advanced details about credit cards</div>
  <div>Disclosure:</div>
  <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div>
  <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div>
</div>

<style>
  :global(body) {
    margin: 0;
  }
  #home {
    padding: 1rem;
  }
  .title {
    font-size: larger;
    text-align: center;
    padding-bottom: 1rem;
  }
</style>
