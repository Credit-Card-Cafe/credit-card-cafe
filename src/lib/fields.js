//type: (string), UpdateCard.svelte will use this to send information to proper component.
//<input type="text"> :  property: { name: "Display Name", type: "text"}
//<select>            :  property: { name: "Display Name", type: "submit", options: ["option 1", "option n"]}
//<input type="radio">:  property: { name: "Display Name", type: "radio", options: ["option 1", "option n"]}

export const dataField = {
  bank: { name: "Bank", type: "text", lvl: 1},
  name: { name: "Name", type: "text", lvl: 2},
  network: {
    name: "Network",
    type: "select",
    options: ["Visa", "MasterCard", "American Express", "Discover"],
    lvl: 3,
  },
  foreign_transaction_fee: { name: "Foreign Transaction Fee", type: "text", lvl: 6},
  annual_fee: { name: "Annual Fee", type: "text", lvl: 7 },
  // rewards: {
  //   name: "Rewards",
  //   type: "dynamicObject",
  //   data: [
  //     {value: },
  //   ],
  // },
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
    lvl: 4,
  },
  color: {name: "Color RGB", type: "text", lvl: 5}
};
