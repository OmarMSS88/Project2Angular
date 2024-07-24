using MercenariesBackend.DAL.Entity;
using System.Linq;

namespace MercenariesBackend.DAL.Initializer
{
    public class DBInitializer
    {
        public static void Initialize(MercenariesDbContext context)
        {
            context.Database.EnsureCreated();

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
        }
    }
}
