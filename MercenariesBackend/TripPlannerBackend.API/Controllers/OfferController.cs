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

        [HttpGet]
        public async Task<ActionResult<List<OfferDto>>> GetAllOffers()
        {
            var offers = await _context.Offers
        .Include(o => o.OfferType)
        .Include(o => o.User) // Ensure related User is included
        .ToListAsync();

            if (offers == null || !offers.Any())
            {
                return NotFound();
            }

            var offerDtos = _mapper.Map<List<OfferDto>>(offers);
            return Ok(offerDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OfferDto>> GetOfferById(int id)
        {
            var offer = await _context.Offers.Include(o => o.OfferType).Include(o => o.User).FirstOrDefaultAsync(o => o.Id == id);

            if (offer == null)
            {
                return NotFound();
            }

            var offerDto = _mapper.Map<OfferDto>(offer);
            return Ok(offerDto);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<OfferDto>>> GetOffersByUser(string userId)
        {
            var offers = await _context.Offers
                .Include(o => o.OfferType)
                .Include(o => o.User)
                .Where(o => o.User.Auth0UserId == userId)
                .ToListAsync();

            if (offers == null || !offers.Any())
            {
                var offas = await _context.Offers
                    .Include(o => o.OfferType)
                    .Include(o => o.User) 
                    .Where(o => o.User.Auth0UserId == "niks")
                    .ToListAsync();
                return Ok(_mapper.Map<List<OfferDto>>(offas)); //return nothing back
                //return NotFound();
            }

            var offerDtos = _mapper.Map<List<OfferDto>>(offers);
            return Ok(offerDtos);
        }

        [HttpPost]
        public async Task<ActionResult<OfferDto>> CreateOffer([FromBody] CreateOfferDto createOfferDto)
        {
            if (createOfferDto == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0UserId == createOfferDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var offer = new Offer
            {
                Title = createOfferDto.Title,
                Description = createOfferDto.Description,
                OfferTypeId = createOfferDto.OfferTypeId,
                User = user, // Set the user association
                PublishDate = createOfferDto.PublishDate
            };
            offer.User = user;

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();

            var createdOfferDto = _mapper.Map<OfferDto>(offer);
            return CreatedAtAction(nameof(GetOfferById), new { id = offer.Id }, createdOfferDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffer(int id, [FromBody] UpdateOfferDto updateOfferDto)
        {
            if (id != updateOfferDto.Id)
            {
                return BadRequest();
            }

            var existingOffer = await _context.Offers.FindAsync(id);
            if (existingOffer == null)
            {
                return NotFound();
            }

            _mapper.Map(updateOfferDto, existingOffer);

            _context.Offers.Update(existingOffer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffer(int id)
        {
            var offer = await _context.Offers.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }

            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
