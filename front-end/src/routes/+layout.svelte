<script lang="ts">
    import "../app.css";
    import Nav from "global-components/layout/Nav.svelte";
</script>

<Nav></Nav>


<slot />


<!-- Footer -->
<footer id="footer" class="w-full pt-10 bg-theme-white/75 dark:bg-main-gray flex flex-col items-center">
    <img class="h-4" src="https://firebasestorage.googleapis.com/v0/b/creditcarddb-3fafd.appspot.com/o/creditcardcafelogo.png?alt=media&token=847bdd20-d667-481e-8448-5bc5b1efcc14" alt="creditcard.cafe">
    <div class="flex flex-row">
        <section class="dark:text-white-warm pl-8 py-16 basis-2/3">
            <div class="font-bold">Disclosure:</div>
            <div>- CreditCard.cafe has no relation to any Bank, Brand, or Credit Card listed on this website.</div>
            <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div>
            <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div>
            <div>- Please understand the financial risk involved with credit cards before applying and using credit cards.</div>
        </section>
        <section class="py-16 basis-1/3 grid grid-cols-2">
            <div>
                <h1 class="underline">Search</h1>
                <ul>
                    <li>List of Cards</li>
                    <li>List of Banks</li>
                    <li>List of Brands</li>
                </ul>
            </div>
            <div>
                <h1 class="underline">Legal</h1>
                <ul>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                </ul>
            </div>
            <div>
                <h1 class="underline">About</h1>
                <ul>
                    <li>Our Company</li>
                    <li>Sustainability Policy</li>
                </ul>
            </div>
        </section>
    </div>
    <div class="text-2xl font-light dark:text-theme-text-white">Developed by Ben Keil, 2024 - please visit <a href="http://benkeil.com">benkeil.com</a></div>  
      
</footer>