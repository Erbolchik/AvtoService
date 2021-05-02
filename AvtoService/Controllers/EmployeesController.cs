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
    public class EmployeesController : ControllerBase
    {
        private BaseDBContext _dbContext;
        public EmployeesController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Employees> GetEmployees()
        {
            return _dbContext.Employees.ToList();
        }

        [HttpPost]
        public IActionResult SaveEmployees([FromBody] Employees employees)
        {
            try
            {
                _dbContext.Employees.Add(employees);
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
        public IActionResult UpdateEmployee(Clients updatedClient)
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
