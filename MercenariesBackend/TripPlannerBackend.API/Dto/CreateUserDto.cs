﻿namespace MercenariesBackend.API.Dto
{
    public class CreateUserDto
    {
        public string Auth0UserId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}