<script lang="ts">
    import "../app.css";
    import Nav from "global-components/layout/Nav.svelte";
</script>

<Nav></Nav>


<slot />


<!-- Footer -->
<footer id="footer" class="w-full py-10 bg-theme-white/75 dark:bg-theme-darkgray dark:text-theme-text-white flex flex-col items-center">
    <img class="h-4" src="https://firebasestorage.googleapis.com/v0/b/creditcarddb-3fafd.appspot.com/o/creditcardcafelogo.png?alt=media&token=847bdd20-d667-481e-8448-5bc5b1efcc14" alt="creditcard.cafe">
    <div class="flex flex-col lg:flex-row px-8">
        <section class="dark:text-white-warm px-16 py-16 lg:basis-3/4">
            <div class="font-bold">Disclosure:</div>
            <div>- The Credit Card Cafe Team has no relation to any Bank, Brand, or Credit Card listed on this website.</div>
            <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div>
            <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div>
            <div>- Please understand the financial risk involved with credit cards before applying and using credit cards.</div>
        </section>
        <section class="px-8 pb-8 flex flex-col gap-y-6 lg:gap-y-0 lg:px-0 lg:pb-0 lg:p-16 lg:basis-1/4 lg:grid lg:grid-cols-2">
            <div>
                <h1 class="underline">Search</h1>
                <ul>
                    <li><a href="/">List of Cards</a></li>
                    <li><a href="/">List of Banks</a></li>
                    <li><a href="/">List of Brands</a></li>
                </ul>
            </div>
            <div>
                <h1 class="underline">Legal</h1>
                <ul>
                    <li><a href="/">Privacy Policy</a></li>
                    <li><a href="/">Terms of Use</a></li>
                </ul>
            </div>
            <div class="col-start-2">
                <h1 class="underline">About</h1>
                <ul>
                    <li><a href="/">Our Company</a></li>
                    <li><a href="/">Sustainability Policy</a></li>
                </ul>
            </div>
        </section>
    </div>
    <div class="text-2xl font-light dark:text-theme-text-white px-8">Developed by the Credit Card Cafe Team 2024</div>        
</footer>
