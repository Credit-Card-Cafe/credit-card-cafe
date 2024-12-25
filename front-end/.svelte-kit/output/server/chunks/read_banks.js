import { B as BankType } from "./types.js";
import "./supabase_client.js";
const bank_table = [
  { bank_name: "Bank of America", bank_url: "bofa", "bank_type": BankType.NationalBank },
  { bank_name: "Chase Bank", bank_url: "chase", "bank_type": BankType.NationalBank },
  { bank_name: "American Express", bank_url: "amex", "bank_type": BankType.NationalBank },
  { bank_name: "Discover", bank_url: "discover", "bank_type": BankType.NationalBank },
  { bank_name: "Capital One", bank_url: "c1", "bank_type": BankType.NationalBank },
  { bank_name: "US Bank", bank_url: "usbank", "bank_type": BankType.NationalBank },
  { bank_name: "Citi", bank_url: "citi", "bank_type": BankType.NationalBank },
  { bank_name: "Pentagon Federal", bank_url: "penfed", "bank_type": BankType.CreditUnion },
  { bank_name: "TD Bank", bank_url: "tdbank", "bank_type": BankType.NationalBank },
  { bank_name: "Goldman Sachs", bank_url: "goldmansachs", "bank_type": BankType.NationalBank },
  { bank_name: "Coastal Community Bank", bank_url: "coastal-community", "bank_type": BankType.FinancialService },
  { bank_name: "Elan Financial Services", bank_url: "elan", "bank_type": BankType.FinancialService },
  { bank_name: "Synchrony", bank_url: "synchrony", "bank_type": BankType.NationalBank },
  { bank_name: "Wells Fargo", bank_url: "wf", "bank_type": BankType.NationalBank }
];
async function fetchOneBankByURL(url) {
  return void 0;
}
async function fetchOneBankByName(name) {
  bank_table.forEach((bank) => {
    if (bank.bank_name === name) {
      return bank;
    }
  });
  return void 0;
}
export {
  fetchOneBankByURL as a,
  fetchOneBankByName as f
};
