namespace MercenariesBackend.API.Dto
{
    public class CreateBookingDto
    {
        public string BookerAuthId { get; set; }
        public int OfferId { get; set; }
        public DateTime BookingTime { get; set; }
        public bool Completed { get; set; }
    }
}
