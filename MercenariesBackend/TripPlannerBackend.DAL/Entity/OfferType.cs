using System.Collections.Generic;

namespace MercenariesBackend.DAL.Entity
{
    public class OfferType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    }
}
