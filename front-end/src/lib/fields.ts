
export const cardFieldNames: {[Key: string]:string} = {
 "card_name": "Name",
 "card_bank": "Bank",
 "card_brand": "Brand",
 "card_network": "Network",
 "card_type": "Type",
 "card_af": "Annual Fee",
 "card_ftf": "Foreign Transaction Fee",
 "card_btf": "Balance Transfer Fee",
 "card_apr": "Annual Percentage Rate",
 "card_caf": "Cash Advance Fee",
 "card_lpf": "Late Payment Fee",
 "card_chip": "Chip",
 "card_embossed": "Embossed",
 "card_material": "Material",
 "card_il": "Info Location",
 "card_ttp": "Tap To Pay",
 "card_weight": "Weight",
 "card_redemption": "Redemption",
 "card_caapr": "Cash Advance Annual Percentage Rate",
 "card_btapr": "Balance Transfer Annual Percentage Rate",
 "card_lpapr": "Late Payment Annual Percentage Rate",
 "card_subv": "Sign Up Bonus Value",
 "card_subq": "Sign Up Bonus Spend Quota",
 "card_subt": "Sign Up Bonus Time Frame",
 "card_auc": "Authorized User Cost"
};

export const redemption: {[key:string]:string} = {
  "Points": "x",
  "Miles": "x",
  "Cash Back": "%",
}

export const lists: {[Key: string]:{[Key: string]: string}} = {
  rewardCategories: {
    custom: "Customizable Rewards", // if the credit card has custom options, add 'custom': 0 to the rewards object
    grocery: "Grocery",
    supermarket: "Supermarket",
    online: "Online Shopping",
    online_grocery: "Online Grocery Shopping",
    travel: "Travel",
    travel_portal: "Travel Through Card's Portal",
    flights_portal: "Flights through Card's Portal",
    gas: "Gas Station", //exclusively gas stations 
    ev: "Electric Vehicle Charging", //exclusively EV charging stations 
    gas_ev: "Gas Station + EV Charging", 
    streaming: "Streaming", // just streaming
    utilities: "Utility", // Home utilities 
    car: "Car Rental",
    airline: "Airline",
    dining: "Restaurants / Dining",
    home: "Home Improvement",
    default: "All Purchases", // "everything else" ,"other purchases" etc... 
    drug: "Drug Store",
    self: "Through Card's Company", // Mostly for store cards 
    high_spend: "Highest spend", //Highest spend category over a given period 
    rotating: "Rotating Category", //Categories of rewards rotate every given period 
    wholesale: "Wholesale Club", //Costco, Sams Club, BJs etc..
    superstore: "Superstore", //Target + Walmart, but not wholesale 
    entertainment: "Entertainment", //Movies, Theater, Streaming included 
  },
};
