﻿using AutoMapper;
using MercenariesBackend.API.Dto;
using MercenariesBackend.DAL;
using MercenariesBackend.DAL.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MercenariesBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly MercenariesDbContext _context;
        private readonly IMapper _mapper;

        public BookingController(MercenariesDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Booking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.Booker)
                .Include(b => b.Offer)
                    .ThenInclude(o => o.OfferType)
                .Include(b => b.Offer)
                    .ThenInclude(o => o.User)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        // GET: api/Booking/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDto>> GetBooking(int id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Booker)
                .Include(b => b.Offer)
                    .ThenInclude(o => o.OfferType)
                .Include(b => b.Offer)
                    .ThenInclude(o => o.User)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BookingDto>(booking));
        }


        [HttpGet("user/{auth0UserId}")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookingsByUser(string auth0UserId)
        {
            var bookings = await _context.Bookings
                .Include(b => b.Booker)
                .Include(b => b.Offer)
                .ThenInclude(o => o.OfferType)
                .Include(b => b.Offer)
                .ThenInclude(o => o.User)
                .Where(b => b.Booker.Auth0UserId == auth0UserId)
                .ToListAsync();

            var bookingDtos = _mapper.Map<IEnumerable<BookingDto>>(bookings);
            return Ok(bookingDtos);
        }

        [HttpGet("myjobs/{authId}")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetMyJobs(string authId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Auth0UserId == authId);
            if (user == null)
            {
                return NotFound();
            }

            var bookings = await _context.Bookings
                .Include(b => b.Booker)
                .Include(b => b.Offer)
                    .ThenInclude(o => o.User)
                .Include(b => b.Offer)
                    .ThenInclude(o => o.OfferType)
                .Where(b => b.Offer.User.Auth0UserId == authId && !b.Complete)
                .ToListAsync();

            var bookingDtos = _mapper.Map<IEnumerable<BookingDto>>(bookings);
            return Ok(bookingDtos);
        }

        // POST: api/Booking
        [HttpPost]
        public async Task<ActionResult<BookingDto>> CreateBooking(CreateBookingDto createBookingDto)
        {
            var booker = await _context.Users.FirstOrDefaultAsync(u => u.Auth0UserId == createBookingDto.BookerAuthId);
            if (booker == null)
            {
                return BadRequest("Booker not found.");
            }

            var offer = await _context.Offers
                .Include(o => o.OfferType)
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == createBookingDto.OfferId);
            if (offer == null)
            {
                return BadRequest("Offer not found.");
            }

            var booking = new Booking
            {
                BookerId = booker.Id,
                OfferId = offer.Id,
                BookingTime = createBookingDto.BookingTime,
                Complete = createBookingDto.Completed
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            var bookingDto = _mapper.Map<BookingDto>(booking);

            return CreatedAtAction(nameof(GetBooking), new { id = bookingDto.Id }, bookingDto);
        }


 
        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> CompleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            booking.Complete = true;
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
