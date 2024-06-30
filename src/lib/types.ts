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
  NoRewards = "No Rewards"
}

export enum CardConsumer {
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

export enum YesOrNo {
  Yes = "Yes",
  No = "No"
}

export interface CreditCardType {
  [key: string]: any;
  //required 
  id: string,
  url: string,
  bank_id: string,
  name: string,
  network: CardNetwork,

  //static info
  link?: string,
  redemption?: CardRedemption,
  brand_id?: string,
  consumer?: CardConsumer,
  color?: RGB,
  image?: boolean,

  //nested objects
  modifiers?: {[Key:string]:{[Key: string]: any}},
  fees?: {[Key: string]:number},
  sub?: {[Key: string]:number},
  rewards?: {[Key: string]:number | {[Key: string]:number}},
  custom_rewards?: {[Key: string]:number | {[Key: string]:number}},
    physical?: {
    [key: string]: any;
    material: string,
    chip: YesOrNo,
    tap_to_pay: YesOrNo,
    embossed: YesOrNo,
    info_location: CardInfoLocation,
  }
  search_terms?: Array<string>,

  //injected from injectBankToCard()
  bank_name?: string,
  bank_url?: string,
  //injected from injectBrandkToCard()
  brand_name?: string,
  brand_url?: string,
}

export interface BankType {
    id: string,
    url: string,
    name: string,
    modifiers?: {[key:string]:string},
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
}

export enum SubmissionType {
  Update = "update",
  AddCard = "add-card",
  AddBank = "add-bank"
}
export interface Submission {
  obj: CreditCardType | BankType,
  display: Boolean,
  id?: string,
  time: number,
  type: SubmissionType,
  user: string,
  image?: File
}

//used in functions.ts and ColorInput.svelte
export type RGB = [number,number,number];

//used in Components of Update.svelte in the Contribute directory.
export type UpdateTypeList = Array<string> | undefined;
export type UpdateTypeField = string | number;
export type UpdateTypeObjectField = string | undefined;
export type UpdateTypeValue = string | number;
export type UpdateTypeObject = {[key:string]: any};
export type UpdateTypeDynamic = {[key:string]:string} | undefined;
