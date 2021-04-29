﻿using AvtoService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

        public LoginController(BaseDBContext dbContext,
                               AuthOptions options)
        {
            _dbContext = dbContext;
            _options = options;
        }

        [HttpPost("/login")]
        public IActionResult Login([FromBody] object obj)
        {
            return Ok();
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
            return user.UserHasRoles
                .Select(e => new Claim(ClaimTypes.Role, e.Role.Name))
                .Concat(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.Name)
                })
                .ToArray();
        }
    }
}
