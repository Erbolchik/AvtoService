using AvtoService.Models;
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
            return _dbContext.Employees.Include(u => u.Users).ToList();
        }

        [HttpPost]
        public IActionResult SaveEmployees([FromBody] Employees employees)
        {
            try
            {
                List<UserRoles> userRoles = new List<UserRoles>();
                userRoles.Add(new UserRoles
                {
                    RoleId = _dbContext.Roles.SingleOrDefault(r => r.Value.Equals("employee")).Id,
                });

                employees.Users.Login = employees.Users.Login.ToLower();
                employees.Users.Password = employees.Users.Password;
                employees.Users.RegistrationDate = DateTime.Now;
                employees.Users.UserRoles = userRoles;

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
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                var employee = _dbContext.Employees.SingleOrDefault(c => c.Id == id);
                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateEmployee([FromBody] Employees updatedEmployee)
        {
            try
            {
                Users user = _dbContext.Users.SingleOrDefault(u => u.Id == updatedEmployee.UserId);
                user.Login = updatedEmployee.Users.Login.ToLower();
                user.Password = updatedEmployee.Users.Password;
                user.Email = updatedEmployee.Users.Email;
                user.Phone = updatedEmployee.Users.Phone;
                updatedEmployee.Users = user;

                _dbContext.Users.Update(user);
                _dbContext.Employees.Update(updatedEmployee);
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
