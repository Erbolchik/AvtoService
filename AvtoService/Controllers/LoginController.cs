using AvtoService.Models;
using AvtoService.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AvtoService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly BaseDBContext _dbContext;
        private readonly AuthOptions _options;
        private readonly IConfiguration _config;


        public LoginController(BaseDBContext dbContext,
                               IOptions<AuthOptions> options,
                               IConfiguration config)
        {
            _dbContext = dbContext;
            _options = options.Value;
            _config = config;

        }

        [HttpPost]
        public IActionResult Login([FromBody] Users loggedUser)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(loggedUser);
            if (user != null)
            {
                var token = GenerateJWT(user);
                response = Ok(new { token });
            }
            return response;

        }

        private IdentityUser Authenticate(Users loggedUser)
        {
            IdentityUser user = null;
            if (_dbContext.Users.Any(m => m.Login == loggedUser.Login.ToLower() && m.Password == loggedUser.Password))
            {
                Users u = _dbContext.Users.FirstOrDefault(m => m.Login == loggedUser.Login.ToLower() && m.Password == loggedUser.Password);
                int? rolesId = _dbContext.UserRoles.FirstOrDefault(m => m.UserId == u.Id).RoleId;
                string role = _dbContext.Roles.FirstOrDefault(m => m.Id == rolesId).Value;


                _dbContext.SaveChanges();
                user = new IdentityUser()
                {
                    Id = u.Id,
                    Email = u.Email,
                    Login = u.Login,
                    Role = role
                };
            }
            return user;
        }


        private string GenerateJWT(IdentityUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Auth:SignInKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Login),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role)
            };
            var token = new JwtSecurityToken(
                issuer: _config["Auth:Issuer"],
                audience: _config["Auth:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(480),
                signingCredentials: credentials
                );
            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodeToken;

        }

        private string CreateToken(IEnumerable<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(_options.GetSignInKeyBytes());
            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(_options.Expires),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string CreateHash(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Invalid password.", nameof(value));
            }

            using var sha = new SHA256Managed();

            byte[] textData = Encoding.UTF8.GetBytes(value);
            byte[] hash = sha.ComputeHash(textData);
            return BitConverter
                .ToString(hash)
                .Replace("-", string.Empty)
                .ToLower();
        }

        private static Claim[] GetClaims(SomeExample user)
        {
            return new[] {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Login)};
        }
    }
}
