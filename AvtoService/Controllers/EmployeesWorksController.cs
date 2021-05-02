using AvtoService.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public IActionResult SaveEmployeeWork([FromBody] EmployeesWorks employeesWorks)
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

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployeeWork(int employeeWorkId)
        {
            try
            {
                var employeesWork = _dbContext.EmployeesWorks.SingleOrDefault(c => c.Id == employeeWorkId);
                _dbContext.EmployeesWorks.Remove(employeesWork);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateEmployeeWork(EmployeesWorks employeesWork)
        {
            try
            {
                _dbContext.EmployeesWorks.Update(employeesWork);
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
