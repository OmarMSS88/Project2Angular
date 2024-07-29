namespace MercenariesBackend.API.Dto
{
    public class UpdateOfferDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int OfferTypeId { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
