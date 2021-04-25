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
    }
}
