import { CardObject } from "$lib/types";

export interface Database {
    public: {
        Tables: {
            cards: {
                Row: CardObject;
                Insert: {
                    id?: number
                    created_at?: string
                    title: string
                    // Define which fields are required/optional for inserts
                }
                Update: {
                    id?: number
                    created_at?: string
                    title?: string
                    // All fields are optional for updates
                }
            }
        }
    }
}