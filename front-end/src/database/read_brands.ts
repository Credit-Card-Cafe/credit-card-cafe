import { type BrandObject } from "$lib/types";

const brand_table: {[Key:string]:BrandObject} = {
    "30001": {"brand_name": "Apple", "brand_url": "apple", "brand_co": false},
    "30002": {"brand_name": "Costco", "brand_url": "costco", "brand_co": true},
    "30003": {"brand_name": "Bilt", "brand_url": "bilt", "brand_co": false},
    "30004": {"brand_name": "REI", "brand_url": "rei", "brand_co": false},
    "30005": {"brand_name": "Hilton", "brand_url": "hilton", "brand_co": true},
    "30006": {"brand_name": "Marriott", "brand_url": "marriott", "brand_co": true},
    "30007": {"brand_name": "BMW", "brand_url": "bmw", "brand_co": false},
    "30008": {"brand_name": "Seen.com", "brand_url": "seen", "brand_co": false},
    "30009": {"brand_name": "Robinhood", "brand_url": "robinhood", "brand_co": false},
    "30010": {"brand_name": "Amazon", "brand_url": "amazon", "brand_co": false}
}


export async function getOneBrandById(id: string): Promise<BrandObject | undefined> {
    return undefined
}
  
export async function getOneBrandByURL(url: string): Promise<BrandObject | undefined> {
    const idAndBankObject = Object.entries(brand_table).find(([id, obj]) => obj.brand_url === url);
    if (idAndBankObject) {
        const [id, bank] = idAndBankObject
        bank.brand_url = id
        return bank
    }
    return undefined
}