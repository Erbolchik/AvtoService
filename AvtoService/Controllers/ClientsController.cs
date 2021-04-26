using AvtoService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private BaseDBContext _dbContext;

        public ClientsController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Clients> GetClients()
        {
            return _dbContext.Clients.Include(c=>c.Cars).ToList();
        }

        [HttpPost]
        public IActionResult SaveClients([FromBody] Clients clients)
        {
            try
            {
                _dbContext.Clients.Add(clients);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
