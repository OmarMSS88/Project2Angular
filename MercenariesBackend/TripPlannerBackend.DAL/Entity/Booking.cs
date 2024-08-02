using System.Collections.Generic;

namespace MercenariesBackend.DAL.Entity
{
    public class Booking
    {
        public int Id { get; set; }
        public int BookerId { get; set; }
        public User Booker { get; set; }
        public int OfferId { get; set; }
        public Offer Offer { get; set; }
        public DateTime BookingTime { get; set; }
        public bool Complete { get; set; }
    }
}
