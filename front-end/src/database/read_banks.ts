import { BankType, type BankObject } from "$lib/types";

const bank_table:{[Key:string]:BankObject} = {
    "20001": {bank_name: "Bank of America", bank_url: "bofa", "bank_type": BankType.NationalBank},
    "20002": {bank_name: "Chase Bank", bank_url: "chase", "bank_type": BankType.NationalBank},
    "20003": {bank_name: "American Express", bank_url: "amex", "bank_type": BankType.NationalBank},
    "20004": {bank_name: "Discover", bank_url: "discover", "bank_type": BankType.NationalBank},
    "20005": {bank_name: "Capital One", bank_url: "c1", "bank_type": BankType.NationalBank},
    "20006": {bank_name: "US Bank", bank_url: "usbank", "bank_type": BankType.NationalBank},
    "20007": {bank_name: "Citi", bank_url: "citi", "bank_type": BankType.NationalBank},
    "20008": {bank_name: "Pentagon Federal", bank_url: "penfed", "bank_type": BankType.CreditUnion},
    "20009": {bank_name: "TD Bank", bank_url: "tdbank", "bank_type": BankType.NationalBank},
    "20010": {bank_name: "Goldman Sachs", bank_url: "goldmansachs", "bank_type": BankType.NationalBank},
    "20011": {bank_name: "Coastal Community Bank", bank_url: "coastal-community", "bank_type": BankType.FinancialService},
    "20012": {bank_name: "Elan Financial Services", bank_url: "elan", "bank_type": BankType.FinancialService},
    "20013": {bank_name: "Synchrony", bank_url: "synchrony", "bank_type": BankType.NationalBank},
    "20014": {bank_name: "Wells Fargo", bank_url: "wf", "bank_type": BankType.NationalBank},
}

export async function getOneBankById(id: string): Promise<BankObject | undefined> {
    return undefined
}

  
export async function getOneBankByURL(url: string): Promise<BankObject | undefined> {
    const idAndBankObject = Object.entries(bank_table).find(([id, obj]) => obj.bank_url === url);
    if (idAndBankObject) {
        const [id, bank] = idAndBankObject
        bank.bank_id = id
        return bank
    }
    return undefined
}