import { BankType, type BankObject } from "$lib/types";
import { supabase } from "./supabase_client";


const bank_table:BankObject[] = [
     {bank_name: "Bank of America", bank_url: "bofa", "bank_type": BankType.NationalBank},
     {bank_name: "Chase Bank", bank_url: "chase", "bank_type": BankType.NationalBank},
     {bank_name: "American Express", bank_url: "amex", "bank_type": BankType.NationalBank},
     {bank_name: "Discover", bank_url: "discover", "bank_type": BankType.NationalBank},
     {bank_name: "Capital One", bank_url: "c1", "bank_type": BankType.NationalBank},
     {bank_name: "US Bank", bank_url: "usbank", "bank_type": BankType.NationalBank},
     {bank_name: "Citi", bank_url: "citi", "bank_type": BankType.NationalBank},
     {bank_name: "Pentagon Federal", bank_url: "penfed", "bank_type": BankType.CreditUnion},
     {bank_name: "TD Bank", bank_url: "tdbank", "bank_type": BankType.NationalBank},
     {bank_name: "Goldman Sachs", bank_url: "goldmansachs", "bank_type": BankType.NationalBank},
     {bank_name: "Coastal Community Bank", bank_url: "coastal-community", "bank_type": BankType.FinancialService},
     {bank_name: "Elan Financial Services", bank_url: "elan", "bank_type": BankType.FinancialService},
    {bank_name: "Synchrony", bank_url: "synchrony", "bank_type": BankType.NationalBank},
    {bank_name: "Wells Fargo", bank_url: "wf", "bank_type": BankType.NationalBank},
]

export async function fetchOneBankById(id: string): Promise<BankObject | undefined> {
    return undefined
}

  
export async function fetchOneBankByURL(url: string): Promise<BankObject | undefined> {
    return undefined
}

export async function fetchOneBankByName(name: string): Promise<BankObject | undefined> {
    bank_table.forEach((bank) => {
        if (bank.bank_name === name) {
            return bank
        }
    });
    return undefined
}