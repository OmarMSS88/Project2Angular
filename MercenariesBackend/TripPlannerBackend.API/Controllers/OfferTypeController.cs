using AutoMapper;
using MercenariesBackend.API.Dto;
using MercenariesBackend.DAL;
using MercenariesBackend.DAL.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MercenariesBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferTypeController : Controller
    {
        private readonly MercenariesDbContext _context;
        private readonly IMapper _mapper;

        public OfferTypeController(MercenariesDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<OfferTypeDto>>> GetAllOfferTypes()
        {
            var offerTypes = await _context.OfferTypes.ToListAsync();

            if (offerTypes == null || !offerTypes.Any())
            {
                return NotFound();
            }

            // Assuming you have a DTO class named OfferTypeDto for mapping
            var offerTypeDtos = _mapper.Map<List<OfferTypeDto>>(offerTypes);
            return Ok(offerTypeDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OfferTypeDto>> GetOfferTypeById(int id)
        {
            var offerType = await _context.OfferTypes.FindAsync(id);

            if (offerType == null)
            {
                return NotFound();
            }

            // Assuming you have a DTO class named OfferTypeDto for mapping
            var offerTypeDto = _mapper.Map<OfferTypeDto>(offerType);
            return Ok(offerTypeDto);
        }

        [HttpPost]
        public async Task<ActionResult<OfferTypeDto>> CreateOfferType([FromBody] CreateOfferTypeDto createOfferTypeDto)
        {
            if (createOfferTypeDto == null)
            {
                return BadRequest();
            }

            var offerType = _mapper.Map<OfferType>(createOfferTypeDto);

            _context.OfferTypes.Add(offerType);
            await _context.SaveChangesAsync();

            var createdOfferTypeDto = _mapper.Map<OfferTypeDto>(offerType);
            return CreatedAtAction(nameof(GetOfferTypeById), new { id = offerType.Id }, createdOfferTypeDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOfferType(int id, [FromBody] UpdateOfferTypeDto updateOfferTypeDto)
        {
            if (id != updateOfferTypeDto.Id)
            {
                return BadRequest();
            }

            var existingOfferType = await _context.OfferTypes.FindAsync(id);
            if (existingOfferType == null)
            {
                return NotFound();
            }

            _mapper.Map(updateOfferTypeDto, existingOfferType);

            _context.OfferTypes.Update(existingOfferType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOfferType(int id)
        {
            var offerType = await _context.OfferTypes.FindAsync(id);
            if (offerType == null)
            {
                return NotFound();
            }

            _context.OfferTypes.Remove(offerType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
