export interface CreateOfferDto {
    title: string;
    description: string;
    offerTypeId: number;
    userId: string;
    publishDate: Date;
  }