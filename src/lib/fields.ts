//type: (string), UpdateCard.svelte will use this to send information to proper component.
//<input type="text">   :  property: { name: "Display Name", type: "text"}
//<select>              :  property: { name: "Display Name", type: "submit", options: ["option 1", "option n"]}
//<input type="radio">  :  property: { name: "Display Name", type: "radio", options: ["option 1", "option n"]}
//lists                 :  property: { name: "Display Name", type: "list", action: "Button Name"}
//<input type="number"> :  property: { name: "Display Name", type: "number", unit: "symbol"}
//<input type="color">  :  property: { name: "Display Name", type: "color"}
//Objects               :  property: { name: "Display Name", type: "object", data: { input1: {}, inputN: {}}
//Dynamic Object        :  property: { name: "Display Name", action: "Button Name", list: "List in Lists", type: "dynamic"}
//<input type="file">   :  property: { name: "Display Name", type: "upload"}

export const dataField: {[Key: string]:{[Key: string]:any}} = {
  bank: { name: "Bank", type: "text"},
  name: { name: "Name", type: "text",},
  network: {
    name: "Network",
    type: "select",
    options: ["Visa", "MasterCard", "American Express", "Discover", "JCB", "No Network"],
  },
  link: { name: "Link to Card", type: "text"},
  fees: {
    name: "Fees",
    type: "object",
    data: {
      foreign_transaction_fee: { name: "Foreign Transaction Fee", type: "number", unit:"%" },
      annual_fee: { name: "Annual Fee", type: "number", unit: "$" },
      balance_transfer_fee: { name: "Balance Transfer Fee", type: "number", unit: "%" },
      apr: { name: "APR", type:"number", unit: "%"},
      cash_advance_fee: { name: "Cash Advance Fee", type: "number", unit: "%" },
      late_fee: { name: "Late Fee", type: "number", unit: "%" },
    }
  },
  rewards: {
    name: "Rewards",
    action: "Add Reward",
    list: "rewardCategories",
    type: "dynamic",
  },
  redemption: {
    name: "Rewards Redemption",
    type: "select",
    options: ["Cash Back", "Miles", "Points", "No Rewards"],
  },
  sub : {
    name: "Sign Up Bonus",
    type: "object",
    data: {
      sub_reward: { name: "SUB Bonus", type: "number", unit: ""},
      sub_quota: { name: "SUB Spend Quota", type: "number", unit: "$"},
      sub_months: { name: "SUB Months", type: "number"}
    }
  },
  brand: {
    name: "Brand",
    type: "text",
  },
  consumer: {
    name: "Consumer",
    type: "select",
    options: ["Personal", "Business", "Student"],
  },
  image: {
    name: "Image",
    type: "upload"
  },
  physical: {
    name: "Physical Card",
    type: "object",
    data: {
      material: { name: "Material", type: "text" },
      chip: { name: "Chip Enabled", type: "radio", options: ["Yes", "No"] },
      tap_to_pay: {
        name: "Tap-to-pay Enabled",
        type: "radio",
        options: ["Yes", "No"],
      },
      embossed: {
        name: "Embossed Name",
        type: "radio",
        options: ["Yes", "No"],
      },
      info_location: {
        name: "Account Number Location",
        type: "radio",
        options: ["Front", "Back", "Both", "No Number"],
      },
    },
  },
  color: { name: "Color RGB", type: "color" },
  search_terms: { name: "Search Terms", type: "list", action: "New Search Term..."}
};

export const redemption: {[key:string]:string} = {
  "Points": "x",
  "Miles": "x",
  "Cash Back": "%",
}

export const lists: {[Key: string]:{[Key: string]: string}} = {
  rewardCategories: {
    //custom: "Customizable Rewards",
    grocery: "Grocery",
    online: "Online Shopping",
    online_grocery: "Online Grocery Shopping",
    travel: "Travel",
    travel_portal: "Travel Through Card's Portal",
    flights_portal: "Flights through Card's Portal",
    gas: "Gas Station",
    ev: "Electric Vehicle Charging",
    gas_ev: "Gas Station + Electric Vehicle Charging",
    streaming: "Streaming",
    utilities: "Utility",
    car: "Car Rental",
    airline: "Airline",
    dining: "Restaurants / Dining",
    home: "Home Improvement",
    default: "All Purchases",
    drug: "Drug Store",
    self: "Through Card's Company",
    high_spend: "Highest spend",
    rotating: "Rotating Category",
    wholesale: "Wholesale Club",
    superstore: "Superstore",
    entertainment: "Entertainment",
  },
};
