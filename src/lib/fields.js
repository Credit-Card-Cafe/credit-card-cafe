//type: (string), UpdateCard.svelte will use this to send information to proper component.
//<input type="text">   :  property: { name: "Display Name", type: "text"}
//<select>              :  property: { name: "Display Name", type: "submit", options: ["option 1", "option n"]}
//<input type="radio">  :  property: { name: "Display Name", type: "radio", options: ["option 1", "option n"]}
//lists                 :  property: { name: "Display Name", type: "list", action: "Button Name"}
//<input type="number"> :  property: { name: "Display Name", type: "number", unit: "symbol"}
//<input type="color">  :  property: { name: "Display Name", type: "color"}
//Object                :  property: { name: "Display Name", type: "object", data: { input1: {}, inputN: {}}
//Dynamic Object        :  property: { name: "Display Name", action: "Button Name", list: "List in Lists", type: "dynamic"}

export const dataField = {
  bank: { name: "Bank", type: "text"},
  name: { name: "Name", type: "text",},
  network: {
    name: "Network",
    type: "select",
    options: ["Visa", "MasterCard", "American Express", "Discover", "None"],
  },
  link: { name: "Link to Card", type: "text"},
  fees: {
    name: "Fees",
    type: "object",
    data: {
      foreign_transaction_fee: { name: "Foreign Transaction Fee", type: "number", unit:"%" },
      annual_fee: { name: "Annual Fee", type: "number", unit: "$" },
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

export const lists = {
  rewardCategories: {
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
    dining: "Dining",
    home: "Home Improvement",
    default: "All other",
    drug: "Drug Store",
    self: "Through Card's Company",
    high_spend: "Highest spend",
    rotating: "Rotating Category",
    wholesale: "Wholesale Club",
    superstore: "Superstore",
    entertainment: "Entertainment",
  },
};
