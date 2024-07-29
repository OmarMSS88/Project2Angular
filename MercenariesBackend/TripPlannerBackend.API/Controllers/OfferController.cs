﻿using AutoMapper;
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
            var offers = await _context.Offers.Include(o => o.OfferType).ToListAsync();

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
            var offer = await _context.Offers.Include(o => o.OfferType).FirstOrDefaultAsync(o => o.Id == id);

            if (offer == null)
            {
                return NotFound();
            }

            var offerDto = _mapper.Map<OfferDto>(offer);
            return Ok(offerDto);
        }

        [HttpPost]
        public async Task<ActionResult<OfferDto>> CreateOffer([FromBody] CreateOfferDto createOfferDto)
        {
            if (createOfferDto == null)
            {
                return BadRequest();
            }

            var offer = _mapper.Map<Offer>(createOfferDto);

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
