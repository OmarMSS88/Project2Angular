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

            // Add Offers
            var offers = new List<Offer>
            {
                new Offer
                {
                    Title = "Offer 1",
                    OfferTypeId = 1, // Adjust to match existing category IDs
                    Description = "Content for Offer 1",
                    Author = "Author 1",
                    PublishDate = DateTime.UtcNow
                },
                new Offer
                {
                    Title = "Offer 2",
                    OfferTypeId = 2, // Adjust to match existing category IDs
                    Description = "Content for Offer 2",
                    Author = "Author 2",
                    PublishDate = DateTime.UtcNow
                }
            };
            context.Offers.AddRange(offers);
            context.SaveChanges();
        }
    }
}
