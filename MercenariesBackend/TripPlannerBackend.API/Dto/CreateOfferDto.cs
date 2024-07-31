using MercenariesBackend.DAL.Entity;

namespace MercenariesBackend.API.Dto
{
    public class CreateOfferDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int OfferTypeId { get; set; }
        public string UserId { get; set; }
        public DateTime PublishDate { get; set; }
    }
}
