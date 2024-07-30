<script lang="ts">
    import "../app.css";
    import Nav from "components/layout/Nav.svelte";
</script>

<Nav></Nav>


<div class="w-full min-h-[-webkit-fill-available] bg-alt dark:bg-main-gray py-24"><slot /></div>


<!-- Footer -->
<div class="w-full p-10 bg-alt/90 dark:bg-main-gray flex flex-col items-center">
    <div class="hidden md:block lg:mr-8 text-green-500 font-semibold">CreditCardDB</div>
    <div class="dark:text-white-warm md:pt-16 md:ml-12 px-8">
        <div>Disclosure:</div>
        <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div>
        <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div>
    </div>
    <div class="p-8">Developed by Ben Keil 2024 - please visit <a href="http://benkeil.com">benkeil.com</a></div>  
      
</div>