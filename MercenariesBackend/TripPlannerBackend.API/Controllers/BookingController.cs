using AutoMapper;
using MercenariesBackend.DAL;
using Microsoft.AspNetCore.Mvc;

namespace MercenariesBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : Controller
    {
        private readonly MercenariesDbContext _context;
        private readonly IMapper _mapper;

        public BookingController(MercenariesDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
