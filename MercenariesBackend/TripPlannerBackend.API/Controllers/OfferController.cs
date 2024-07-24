using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MercenariesBackend.API.Dto;
using MercenariesBackend.DAL;
using MercenariesBackend.DAL.Entity;

namespace MercenariesBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly MercenariesDbContext _context;
        private readonly IMapper _mapper;
        public OfferController(MercenariesDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

    }
}
