<div class="pt-20 mx-20 flex flex-col items-center">
    <div class="flipText">
        <div class="text-5xl md:text-8xl text-purple-500 font-semibold text-center">CardFinder A.I.</div>
        <div class="text-5xl md:text-8xl text-purple-500 font-semibold text-center blur-sm">CardFinder A.I.</div>
    </div>  
    <div class="w-2/3 md:min-h-[calc(100vh-4rem)] pt-20 flex flex-col justify-between flex-1 items-center border-t-2">
        <div class="mt-2">
            <div class="human">Which card has the best travel perks?</div>
            <div class="ai">Great Question!<br><br>Choosing the best credit card for travel perks can depend on your specific needs and preferences, so let's figure that out.<br> Which perks are you looking for? 
                <ul class="ml-2">
                    <li>- Travel Insurance</li>
                    <li>- Lounge Access</li>
                    <li>- Hotel Upgrades</li>
                    <li>- Spending Credits</li>
                </ul>
            </div>
            <div class="human">Lounge Access and Travel Insurance</div>
            <div class="ai">I have found these choices based on your criteria.<br><br>Please note that while these cards may suit your lifestyle, I can not guarentee your application is accepted. 
            </div>
        </div>
        <input type="text" value="Which card has the best travel perks?" class="w-11/12 h-8 my-2 p-2 pl-4 rounded-md">
    </div>
</div>

<style>
.flipText > :last-child {
  transform: rotatex(180deg) translatey(15px);
  mask-image: linear-gradient(transparent 50%, white 90%);
  -webkit-mask-image: linear-gradient(transparent 50%, white 90%);
}
.human {
    @apply bg-gray-200 float-right my-1 mx-2 py-2 px-4 rounded-lg text-right;
    max-width: 66%;
}
.ai {
    @apply float-left my-1 mx-2 p-2 rounded-md;
    max-width: 66%;
}
</style>

