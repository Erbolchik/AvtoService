using AvtoService.Controllers.Utils;
using AvtoService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BaseDBContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserController(BaseDBContext dbContext,
                              IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [Authorize]
        [HttpGet("GetMyProfile")]
        public IActionResult GetMyProfile()
        {
            try
            {
                var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
                var login = JwtHelper.GetUserLogin(token, _configuration["Auth:SignInKey"]);

                Users user = _dbContext.Users
                                        .Include(c => c.Clients)
                                        .Include(e => e.Employees)
                                        .Include(r => r.UserRoles)
                                        .ThenInclude(rr => rr.Roles)
                                        .SingleOrDefault(u => u.Login == login);

                UserResponse userResponse = new UserResponse();
                userResponse.Email = user.Email;
                userResponse.Login = user.Login;
                userResponse.RegistrationName = user.RegistrationDate;
                userResponse.Phone = user.Phone;
                if (user.Clients != null)
                {
                    userResponse.FullName = String.Format("{0} {1} {2}", user.Clients.FirstName, user.Clients.LastName, user.Clients.MiddleName);
                }
                else
                {
                    userResponse.FullName = String.Format("{0} {1} {2}", user.Employees.FirstName, user.Employees.LastName, user.Employees.MiddleName);
                }

                if (user.UserRoles[0] != null)
                {
                    userResponse.RoleName = user.UserRoles[0].Roles.Value;
                }

                return Ok(userResponse);
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }
    }
}
