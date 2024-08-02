using Microsoft.EntityFrameworkCore;
using MercenariesBackend.DAL.Entity;

namespace MercenariesBackend.DAL
{
    public class MercenariesDbContext : DbContext
    {
        public MercenariesDbContext()
        {
        }

        public MercenariesDbContext(DbContextOptions<MercenariesDbContext> options) : base(options)
        {
        }

        public DbSet<OfferType> OfferTypes => Set<OfferType>();
        public DbSet<Offer> Offers => Set<Offer>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Booking> Bookings => Set<Booking>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OfferType>()
                .HasMany(ot => ot.Offers)
                .WithOne(o => o.OfferType)
                .HasForeignKey(o => o.OfferTypeId)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(u => u.Offers)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .IsRequired();

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Booker)
                .WithMany(u => u.Bookings) // Assuming a User can have multiple Bookings
                .HasForeignKey(b => b.BookerId)
                .OnDelete(DeleteBehavior.Restrict) // Specify ON DELETE RESTRICT to avoid cycles or multiple cascade paths
                .IsRequired();

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Offer)
                .WithMany(o => o.Bookings) // Assuming an Offer can have multiple Bookings
                .HasForeignKey(b => b.OfferId)
                .OnDelete(DeleteBehavior.Restrict) // Specify ON DELETE RESTRICT to avoid cycles or multiple cascade paths
                .IsRequired();

            modelBuilder.Entity<OfferType>().ToTable("OfferType");
            modelBuilder.Entity<Offer>().ToTable("Offer");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Booking>().ToTable("Booking");
        }
    }
}
