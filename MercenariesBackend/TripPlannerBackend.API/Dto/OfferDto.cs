namespace MercenariesBackend.API.Dto
{
    public class OfferDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int OfferTypeId { get; set; }

        public OfferTypeDto OfferType { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
