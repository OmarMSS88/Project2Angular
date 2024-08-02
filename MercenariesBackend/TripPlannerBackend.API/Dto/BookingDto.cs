namespace MercenariesBackend.API.Dto
{
    public class BookingDto
    {
        public int Id { get; set; }
        public int BookerId { get; set; }
        public UserDto Booker { get; set; }
        public int OfferId { get; set; }
        public OfferDto Offer { get; set; }
        public DateTime BookingTime { get; set; }
        public bool Complete { get; set; }
    }
}
