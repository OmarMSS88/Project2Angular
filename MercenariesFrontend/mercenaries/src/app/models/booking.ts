import { Offer } from "./offer";
import { User } from "./user";


export interface Booking {
    id: number;
    bookerId: number;
    booker: User;
    offerId: number;
    offer: Offer;
    bookingTime: string;
    complete: boolean;
}