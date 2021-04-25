using AvtoService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesWorksController : ControllerBase
    {
        private BaseDBContext _dbContext;
        public EmployeesWorksController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<EmployeesWorks> GetEmployeesWorks()
        {
            return _dbContext.EmployeesWorks.ToList();
        }

        [HttpPost]
        public IActionResult SaveEmployeeWorks([FromBody] EmployeesWorks employeesWorks)
        {
            try
            {
                _dbContext.EmployeesWorks.Add(employeesWorks);
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
