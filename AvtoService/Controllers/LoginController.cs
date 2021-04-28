using AvtoService.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly BaseDBContext _dbContext;

        public LoginController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Login()
        {
            return Ok();
        }

        public IActionResult LogOut()
        {
            return Ok();
        }

    }
}
