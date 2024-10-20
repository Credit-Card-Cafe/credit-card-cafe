
export const dataField: {[Key: string]:{[Key: string]:any}} = {
  card_bank: { name: "Bank", type: "text"},
  card_name: { name: "Name", type: "text"},
  network: {
    name: "Network",
    type: "select",
    options: ["Visa", "MasterCard", "American Express", "Discover", "JCB", "No Network"],
  },
  link: { name: "Link to Card", type: "text"},
  foreign_transaction_fee: { name: "Foreign Transaction Fee", type: "number", unit:"%" },
      annual_fee: { name: "Annual Fee", type: "number", unit: "$" },
      balance_transfer_fee: { name: "Balance Transfer Fee", type: "number", unit: "%" },
      apr: { name: "APR", type:"number", unit: "%"},
      cash_advance_fee: { name: "Cash Advance Fee", type: "number", unit: "%" },
      late_fee: { name: "Late Fee", type: "number", unit: "%" },

  rewards: {
    name: "Rewards",
    action: "Add Reward",
    list: "rewardCategories",
    type: "dynamic",
  },
  custom_rewards: {
    name: "Rewards",
    action: "Add Reward",
    list: "rewardCategories",
    type: "dynamic",
  },
  limit: {
    name: "Rewards Limit",
    type: "number",
    unit: "$",
  },
  limit_period: {
    type: "select",
    options: ["Every Year", "Every Month", "Every Quarter", "Daily", "Weekly"],
  },
  redemption: {
    name: "Rewards Redemption",
    type: "select",
    options: ["Cash Back", "Miles", "Points", "No Rewards"],
  },
      sub_reward: { name: "SUB Bonus", type: "number", unit: ""},
      sub_quota: { name: "SUB Spend Quota", type: "number", unit: "$"},
      sub_months: { name: "SUB Months", type: "number"},
  brand_name: {
    name: "Brand",
    type: "text",
  },
  consumer: {
    name: "Consumer",
    type: "select",
    options: ["Personal", "Business", "Student"],
  },
      material: { name: "Material", type: "text" },
      chip: { name: "Chip Enabled", type: "radio", options: [true, false] },
      tap_to_pay: {
        name: "Tap-to-pay Enabled",
        type: "radio",
        options: [true, false],
      },
      embossed: {
        name: "Embossed Name",
        type: "radio",
        options: [true, false],
      },
      info_location: {
        name: "Account Number Location",
        type: "radio",
        options: ["Front", "Back", "Both", "No Number"],
      },
};

export const redemption: {[key:string]:string} = {
  "Points": "x",
  "Miles": "x",
  "Cash Back": "%",
}

export const lists: {[Key: string]:{[Key: string]: string}} = {
  rewardCategories: {
    custom: "Customizable Rewards",
    grocery: "Grocery",
    online: "Online Shopping",
    online_grocery: "Online Grocery Shopping",
    travel: "Travel",
    travel_portal: "Travel Through Card's Portal",
    flights_portal: "Flights through Card's Portal",
    gas: "Gas Station",
    ev: "Electric Vehicle Charging",
    gas_ev: "Gas Station + EV Charging",
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
