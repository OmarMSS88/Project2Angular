export interface CreateBooking {
    bookerAuthId: string;
    offerId: number;
    bookingTime: Date;
    completed: boolean;
  }