using AutoMapper;
using MercenariesBackend.DAL;
using Microsoft.AspNetCore.Mvc;

namespace MercenariesBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly MercenariesDbContext _context;
        private readonly IMapper _mapper;

        public UserController(MercenariesDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
