using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// User.cs
namespace MercenariesBackend.DAL.Entity
{
    public class User
    {
        public int Id { get; set; }
        public string Auth0UserId { get; set; } // Auth0 User ID
        public string Email { get; set; }
        public string FullName { get; set; }
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
        public ICollection<Booking> Bookings { get; set; }
    }
}

