import { OfferType } from "./offer-type";
import { User } from "./user";


export interface Offer {
    id: number;
    title: string;
    offerTypeId: number;
    offerType: OfferType;
    description: string;
    userId: number;
    user: User;
    publishDate: string;
}