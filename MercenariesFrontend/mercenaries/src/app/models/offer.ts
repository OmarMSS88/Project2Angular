import { OfferType } from "./offer-type";


export interface Offer {
    id: number;
    title: string;
    offerTypeId: number;
    offerType: OfferType;
    description: string;
    author: string;
    publishDate: string;
}