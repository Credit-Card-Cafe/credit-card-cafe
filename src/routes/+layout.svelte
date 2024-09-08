<script lang="ts">
    import "../app.css";
    import Nav from "components/layout/Nav.svelte";
</script>

<Nav></Nav>


<div class="w-full min-h-[-webkit-fill-available] bg-alt dark:bg-main-gray py-24"><slot /></div>


<!-- Footer -->
<div id="footer" class="w-full pt-10 md:mt-0 md:p-10 bg-alt/90 dark:bg-main-gray flex flex-col items-center">
    <img class="h-4" src="../../../creditcardcafelogo.png" alt="creditcard.cafe">
    <div class="dark:text-white-warm md:pt-16 md:ml-12 px-4  md:px-8">
        <div class="font-bold">Disclosure:</div>
        <div>- CreditCard.cafe has no relation to any Bank, Brand, or Credit Card listed on this website.</div>
        <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div>
        <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div>
        <div>- Please understand the financial risk involved with credit cards before applying and using credit cards.</div>
    </div>
    <div class="p-8 dark:text-white-warm">Developed by Ben Keil, 2024 - please visit <a href="http://benkeil.com">benkeil.com</a></div>  
      
</div>