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
            return _dbContext.Clients.Include(c => c.Cars).ToList();
        }

        [HttpPost]
        public IActionResult SaveClient([FromBody] Clients clients)
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

        [HttpDelete("{id}")]
        public IActionResult DeleteClient(int clientId)
        {
            try
            {
                var client = _dbContext.Clients.SingleOrDefault(c => c.Id == clientId);
                _dbContext.Clients.Remove(client);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateClient(Clients updatedClient)
        {
            try
            {
                _dbContext.Clients.Update(updatedClient);
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
