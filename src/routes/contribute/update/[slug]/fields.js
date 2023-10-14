//javascript reference: "database name",
export const dataField = {
  bank: { name: "Bank", type: "text" },
  name: { name: "Name", type: "text" },
  network: {
    name: "Network",
    type: "select",
    options: ["Visa", "MasterCard", "American Express", "Discover"],
  },
  foreign_transaction_fee: { name: "Foreign Transaction Fee", type: "text" },
  annual_fee: { name: "Annual Fee", type: "text" },
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
  },
};
