export enum CardNetwork {
  Visa = "Visa",
  MasterCard = "MasterCard",
  Discover = "Discover",
  None = "No Network",
  AmericanExpress = "American Express",
}

export enum CardRedemption {
  Miles = "Miles",
  Points = "Points",
  CashBack = "Cash Back",
  StoreCredit = "Store Credit",
  None = "No Rewards"
}

export enum CardType {
  Personal = "Personal",
  Business = "Business",
  Student = "Student"
}

export enum CardInfoLocation {
  Front = "Front",
  Back = "Back",
  Both = "Both",
  NoNumber = "No Number"
}

export enum BankType {
  LocalBank = "Local Bank", 
  NationalBank = "National Bank", 
  CreditUnion = "Credit Union", 
  FinancialService= "Financial Service"
} 

export enum COP { //Card Object Properties. This will be used a lot, so I have shortened it. 
  //Used as querys in Table.svelte, as enum string in cards/ 
  card_id = "card_id",
  card_name = "card_name",
  card_bank = "card_bank",
  card_brand = "card_brand",
  card_network = "card_network",
  card_type = "card_type",
  card_url = "card_url",
  card_link = "card_link",
  card_image = "card_image",
  card_af = "card_af",
  card_ftf = "card_ftf",
  card_btf = "card_btf",
  card_apr = "card_apr",
  card_caf = "card_caf",
  card_lpf = "card_lpf",
  card_chip = "card_chip",
  card_embossed = "card_embossed",
  card_material = "card_material",
  card_il = "card_il",
  card_ttp = "card_ttp",
  card_weight = "card_weight",
  card_color = "card_color",
  card_redemption = "card_redemption",
  card_caapr = "card_caapr",
  card_btapr = "card_btapr",
  card_lpapr = "card_lpapr",
  card_subv = "card_subv",
  card_subq = "card_subq",
  card_subt = "card_subt",
  card_auc = "card_auc"
}

export type COData = Exclude<COP, COP.card_id | COP.card_name | COP.card_bank | COP.card_url | COP.card_link | COP.card_color | COP.card_image>

interface CardDetails {
  card_modifiers?: {[Key:string]:{[Key: string]: any}},
  card_rewards?: {[Key: string]:number | {[Key: string]:number}},
  card_custom?: {[Key: string]:number | {[Key: string]:number}},
  card_bankurl?: string,
  card_brandurl?: string,
} 

export interface CardObject {
  [COP.card_id]?: string;
  [COP.card_name]: string,
  [COP.card_bank]: string,
  [COP.card_brand]?: string,
  [COP.card_network]: CardNetwork,
  [COP.card_type]?: CardType,
  [COP.card_url]: string,
  [COP.card_link]?: string,
  [COP.card_image]?: null,
  [COP.card_af]?: number | string,
  [COP.card_ftf]?: number | string,
  [COP.card_btf]?: number | string,
  [COP.card_apr]?: number | string,
  [COP.card_caf]?: number | string,
  [COP.card_lpf]?: number | string,
  [COP.card_chip]?: boolean,
  [COP.card_embossed]?: boolean,
  [COP.card_material]?: string,
  [COP.card_il]?: CardInfoLocation,
  [COP.card_ttp]?: boolean,
  [COP.card_weight]?: number,
  [COP.card_color]: string,
  [COP.card_redemption]: CardRedemption,
  [COP.card_caapr]?: number | string,
  [COP.card_btapr]?: number | string,
  [COP.card_lpapr]?: number | string,
  [COP.card_subv]?: number | string,
  [COP.card_subq]?: number | string,
  [COP.card_subt]?: number | string,
  [COP.card_auc]?: number | string
}

export interface ModifiedCardObject extends CardObject, CardDetails {};

export interface BankObject {
    bank_id?: string;
    bank_url: string,
    bank_name: string,
    bank_type: BankType
}

export interface BrandObject {
  brand_url: string,
  brand_name: string,
  brand_co: boolean
}

export interface UserType {
    display_name?: string | null,
    admin?: boolean,
    wallet: Array<string>,
    tracking: Array<string>
    uid?: string,
    email?: string | null,
    custom_choices?: Array<{[key: string]: string}>,
    modifiers?: Array<string>
    table_setting_acronym?: boolean,
    table_setting_advanced?: boolean,
    table_setting_queries?: COP[],
    table_setting_userselection?: TLS
}

//used in the offline uploader.
export type UpdateTypeList = Array<string> | undefined;
export type UpdateTypeObjectField = string | undefined;
export type UpdateTypeObject = {[key:string]: any};
export type UpdateTypeDynamic = {[key:string]:string} | undefined;

//Table List Switch
export enum TLS {
  Both,
  Wallet,
  Tracking,
}

//used for Account Rewards 
export interface RewardSet {
  card: ModifiedCardObject,
  value: string,
  custom: boolean
}