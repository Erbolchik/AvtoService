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
    public class CarsController : ControllerBase
    {
        private BaseDBContext _dbContext;

        public CarsController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Cars> GetCars()
        {
            return _dbContext.Cars.Include(c => c.Clients)
                                  .ThenInclude(u => u.Users)
                                  .ToList();
        }

        [HttpPost]
        public IActionResult CreateCar([FromBody] Cars cars)
        {
            try
            {
                _dbContext.Cars.Add(cars);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCar(int id)
        {
            try
            {
                var car = _dbContext.Cars.SingleOrDefault(car => car.Id == id);
                _dbContext.Cars.Remove(car);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateCar([FromBody] Cars updatedCar)
        {
            try
            {
                _dbContext.Cars.Update(updatedCar);
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
