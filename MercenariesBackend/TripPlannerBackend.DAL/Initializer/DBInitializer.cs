using MercenariesBackend.DAL.Entity;
using System.Linq;

namespace MercenariesBackend.DAL.Initializer
{
    public class DBInitializer
    {
        public static void Initialize(MercenariesDbContext context)
        {
            context.Database.EnsureCreated();

            // Check if there are any existing records in the Offer table
            if (context.Offers.Any())
            {
                return; // DB has been seeded
            }

            // Seed the OfferTypes table with some dummy data
            if (!context.OfferTypes.Any())
            {
                var offerTypes = new OfferType[]
                {
                    new OfferType { Name = "Negotiable" },
                    new OfferType { Name = "Fixed Price" },
                    new OfferType { Name = "Volunteer" }
                };

                context.OfferTypes.AddRange(offerTypes);
                context.SaveChanges();
            }

            // Seed the Users table with some dummy data
            if (!context.Users.Any())
            {
                var users = new User[]
                {
                    new User { Auth0UserId = "auth0|66a51634157a2c4b9074e1aa", Email = "Emailski", FullName = "The Admin" },
                    new User { Auth0UserId = "auth0|66a8d838b4ec3e5b9eca24d4", Email = "omarsonmohi@yahoo.com", FullName = "Omar" }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            // Add Offers
            if (!context.Offers.Any())
            {
                var offers = new List<Offer>
                {
                    new Offer
                    {
                        Title = "Lawn Mowing Service",
                        OfferTypeId = context.OfferTypes.FirstOrDefault(ot => ot.Name == "Fixed Price")?.Id ?? 1,
                        Description = "Get your lawn looking pristine with our professional mowing service. Includes trimming and edging to ensure your yard is perfectly manicured.",
                        UserId = context.Users.FirstOrDefault(u => u.FullName == "The Admin")?.Id ?? 3,
                        PublishDate = DateTime.UtcNow
                    },
                    new Offer
                    {
                        Title = "Car Washing and Detailing",
                        OfferTypeId = context.OfferTypes.FirstOrDefault(ot => ot.Name == "Fixed Price")?.Id ?? 1,
                        Description = "Our thorough car washing and detailing service will make your vehicle shine inside and out. Includes exterior wash, interior vacuuming, and a full wax treatment.",
                        UserId = context.Users.FirstOrDefault(u => u.FullName == "Omar")?.Id ?? 2,
                        PublishDate = DateTime.UtcNow
                    },
                    new Offer
                    {
                        Title = "Pet Sitting and Dog Walking",
                        OfferTypeId = context.OfferTypes.FirstOrDefault(ot => ot.Name == "Volunteer")?.Id ?? 2,
                        Description = "Need someone to look after your pets while you're away? Our pet sitting service includes daily walks, feeding, and lots of playtime. Great for busy pet owners!",
                        UserId = context.Users.FirstOrDefault(u => u.FullName == "Omar")?.Id ?? 2,
                        PublishDate = DateTime.UtcNow
                    },
                    new Offer
                    {
                        Title = "Grocery Shopping Assistance",
                        OfferTypeId = context.OfferTypes.FirstOrDefault(ot => ot.Name == "Volunteer")?.Id ?? 2,
                        Description = "If you're unable to go grocery shopping yourself, our service can help. We’ll take your shopping list and deliver the groceries to your door.",
                        UserId = context.Users.FirstOrDefault(u => u.FullName == "Omar")?.Id ?? 2,
                        PublishDate = DateTime.UtcNow
                    }
                };


                context.Offers.AddRange(offers);
                context.SaveChanges();
            }

            // Add Bookings
            if (!context.Bookings.Any())
            {
                var adminUserId = context.Users.FirstOrDefault(u => u.FullName == "The Admin")?.Id;
                var offerId = context.Offers.FirstOrDefault(o => o.Title == "Offer 2")?.Id;

                if (adminUserId.HasValue && offerId.HasValue)
                {
                    var bookings = new List<Booking>
                    {
                        new Booking
                        {
                            BookerId = adminUserId.Value,
                            OfferId = offerId.Value,
                            BookingTime = DateTime.UtcNow,
                            Complete = false
                        }
                    };

                    context.Bookings.AddRange(bookings);
                    context.SaveChanges();
                }
            }
        }
    }
}
