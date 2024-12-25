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

export enum COP { //Filterable card Properties. 
  card_bank = "card_bank",
  card_brand = "card_brand",
  card_network = "card_network",
  card_type = "card_type",
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
  card_redemption = "card_redemption",
  card_caapr = "card_caapr",
  card_btapr = "card_btapr",
  card_lpapr = "card_lpapr",
  card_subv = "card_subv",
  card_subq = "card_subq",
  card_subt = "card_subt",
  card_auc = "card_auc"
}

export interface CardDetails {
  card_modifiers?: {[Key:string]:{[Key: string]: any}},
  card_rewards?: {[Key: string]:number | {[Key: string]:number}},
  card_custom?: {[Key: string]:number | {[Key: string]:number}},
  card_bankurl?: string,
  card_brandurl?: string,
} 

export interface CardObject {
  card_id: string;  // UUID
  card_name: string;
  [COP.card_bank]: string;
  [COP.card_brand]: string | null;
  [COP.card_network]: CardNetwork;
  [COP.card_type]: CardType | null;
  card_url: string;
  card_link: string | null;
  [COP.card_af]: string | null;      // varchar(50)
  [COP.card_ftf]: string | null;     // varchar(50)
  [COP.card_btf]: string | null;     // varchar(50)
  [COP.card_apr]: string | null;     // varchar(50)
  [COP.card_caf]: string | null;     // varchar(50)
  [COP.card_lpf]: string | null;     // varchar(50)
  [COP.card_chip]: boolean | null;
  [COP.card_embossed]: boolean | null;
  [COP.card_material]: string | null; // varchar(100)
  [COP.card_il]: CardInfoLocation | null;
  [COP.card_ttp]: boolean | null;
  [COP.card_weight]: number | null;   // smallint
  card_color: string;                // varchar(50)
  [COP.card_redemption]: CardRedemption;
  [COP.card_caapr]: string | null;   // varchar(50)
  [COP.card_btapr]: string | null;   // varchar(50)
  [COP.card_lpapr]: string | null;   // varchar(50)
  [COP.card_subv]: number | null;    // integer
  [COP.card_subq]: number | null;    // integer
  [COP.card_subt]: number | null;    // integer
  [COP.card_auc]: number | null;     // smallint
  card_meta_lastupdate: Date | null;
  card_meta_rating: number;          // real (constraint: <= 5)
  card_meta_ratings: number | null;  // bigint
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