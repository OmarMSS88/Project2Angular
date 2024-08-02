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
    public class UserController : Controller
    {
        private readonly MercenariesDbContext _context;
        private readonly IMapper _mapper;

        public UserController(MercenariesDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<UserDto>>(users));
        }

        // GET: api/user/{authId}
        [HttpGet("{authId}")]
        public async Task<ActionResult<UserDto>> GetUser(string authId)
        {
            if (string.IsNullOrEmpty(authId))
            {
                return BadRequest("Auth ID cannot be null or empty.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0UserId == authId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<UserDto>(user));
        }


        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto createUserDto)
        {
            if (createUserDto == null)
            {
                return BadRequest();
            }
            var user = _mapper.Map<User>(createUserDto);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, _mapper.Map<UserDto>(user));
        }



        [HttpPut("{authId}")]
        public async Task<IActionResult> UpdateUserProfile(string authId, [FromBody] UpdateUserDto updates)
        {
            if (string.IsNullOrEmpty(authId))
            {
                return BadRequest("Auth ID cannot be null or empty.");
            }

            if (updates == null)
            {
                return BadRequest("Update data cannot be null.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0UserId == authId);

            if (user == null)
            {
                return NotFound();
            }

            // Apply updates
            if (!string.IsNullOrEmpty(updates.FullName))
            {
                user.FullName = updates.FullName;
            }

            // Save changes
            await _context.SaveChangesAsync();

            return NoContent(); // No content means the update was successful
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
