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
                    new OfferType { Name = "Consulting" },
                    new OfferType { Name = "Design" },
                    new OfferType { Name = "Development" }
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
                    new User { Auth0UserId = "auth0|dummyuser2", Email = "Emailski", FullName = "Dummy User 2" }
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
                        Title = "Offer 1",
                        OfferTypeId = context.OfferTypes.FirstOrDefault(ot => ot.Name == "Consulting")?.Id ?? 1,
                        Description = "Content for Offer 1",
                        UserId = context.Users.FirstOrDefault(u => u.FullName == "The Admin")?.Id ?? 3,
                        PublishDate = DateTime.UtcNow
                    },
                    new Offer
                    {
                        Title = "Offer 2",
                        OfferTypeId = context.OfferTypes.FirstOrDefault(ot => ot.Name == "Design")?.Id ?? 2,
                        Description = "Content for Offer 2",
                        UserId = context.Users.FirstOrDefault(u => u.FullName == "Dummy User 2")?.Id ?? 2,
                        PublishDate = DateTime.UtcNow
                    }
                };

                context.Offers.AddRange(offers);
                context.SaveChanges();
            }
        }
    }
}
