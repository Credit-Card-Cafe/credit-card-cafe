//type: (string), UpdateCard.svelte will use this to send information to proper component.
//<input type="text">   :  property: { name: "Display Name", type: "text"}
//<select>              :  property: { name: "Display Name", type: "submit", options: ["option 1", "option n"]}
//<input type="radio">  :  property: { name: "Display Name", type: "radio", options: ["option 1", "option n"]}
//lists                 :  property: { name: "Display Name", type: "list", item_type:["type of each item"]}
//<input type="number"> :  property: { name: "Display Name", type: "number"}

export const dataField = {
  bank: { name: "Bank", type: "text", lvl: 1 },
  name: { name: "Name", type: "text", lvl: 2 },
  network: {
    name: "Network",
    type: "select",
    options: ["Visa", "MasterCard", "American Express", "Discover"],
  },
  foreign_transaction_fee: {
    name: "Foreign Transaction Fee (%)",
    type: "number",
  },
  annual_fee: { name: "Annual Fee ($)", type: "number" },
  // rewards: {
  //   name: "Rewards",
  //   type: "dynamicObject",
  //   data: {
  //
  //     rewards_list: {name: "Rewards Categories", type="list"}
  // },
  redemption: {
    name: "Rewards Redemption",
    type: "select",
    options: ["Cash Back", "Miles", "Points", "Statement Credit", "Gift Cards"],
  },
  brand: {
    name: "Brand",
    type: "text",
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
        name: "Information Location",
        type: "radio",
        options: ["Front", "Back", "Both"],
      },
    },
  },
  color: { name: "Color RGB", type: "color" },
};
