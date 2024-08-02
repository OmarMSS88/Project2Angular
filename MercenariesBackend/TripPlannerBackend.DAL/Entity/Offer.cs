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
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime PublishDate { get; set; }
        public ICollection<Booking> Bookings { get; set; }
    }
}
