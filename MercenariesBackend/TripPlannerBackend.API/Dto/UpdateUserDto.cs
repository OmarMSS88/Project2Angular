namespace MercenariesBackend.API.Dto
{
    public class UpdateUserDto
    {
        public int Id { get; set; }
        public string Auth0UserId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}