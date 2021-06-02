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
            return _dbContext.Clients
                                .Include(c => c.Cars)
                                .Include(c => c.Users)
                                .ToList();
        }

        [HttpPost]
        public IActionResult SaveClient([FromBody] Clients clients)
        {
            try
            {
                List<UserRoles> userRoles = new List<UserRoles>();
                userRoles.Add(new UserRoles
                {
                    RoleId = _dbContext.Roles.SingleOrDefault(r => r.Value.Equals("user")).Id,
                });

                clients.Users.Login = clients.Users.Login.ToLower();
                clients.Users.Password = clients.Users.Password;
                clients.Users.RegistrationDate = DateTime.Now;
                clients.Users.UserRoles = userRoles;

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
        public IActionResult DeleteClient(int id)
        {
            try
            {
                var client = _dbContext.Clients.SingleOrDefault(c => c.Id == id);
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
        public IActionResult UpdateClient([FromBody] Clients updatedClient)
        {
            try
            {
                Users user = _dbContext.Users.SingleOrDefault(u => u.Id == updatedClient.UserId);
                user.Login = updatedClient.Users.Login.ToLower();
                user.Password = updatedClient.Users.Password;
                user.Email = updatedClient.Users.Email;
                user.Phone = updatedClient.Users.Phone;
                updatedClient.Users = user;

                _dbContext.Users.Update(user);
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
