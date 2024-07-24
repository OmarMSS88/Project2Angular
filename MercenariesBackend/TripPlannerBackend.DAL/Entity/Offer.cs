using System;

namespace MercenariesBackend.DAL.Entity
{
    public class Offer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int OfferTypeId { get; set; } // Foreign key property
        public OfferType OfferType { get; set; } // Navigation property
        public string Description { get; set; }
        public string Author { get; set; } // This will eventually be the User Entity when it exists
        public DateTime PublishDate { get; set; }
    }
}
