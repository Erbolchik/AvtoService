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
    public class ServiceSpendingController : ControllerBase
    {
        private BaseDBContext _dbContext;
        public ServiceSpendingController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<ServiceSpending> GetServiceSpendings()
        {
            return _dbContext.ServiceSpendings.ToList();
        }

        [HttpPost]
        public IActionResult SaveServiceSpending([FromBody] ServiceSpending serviceSpending)
        {
            try
            {
                _dbContext.ServiceSpendings.Add(serviceSpending);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteServiceSpending(int serviceSpendingId)
        {
            try
            {
                var serviceSpending = _dbContext.ServiceSpendings
                                            .SingleOrDefault(c => c.Id == serviceSpendingId);
                _dbContext.ServiceSpendings.Remove(serviceSpending);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateServiceSpending(ServiceSpending serviceSpending)
        {
            try
            {
                _dbContext.ServiceSpendings.Update(serviceSpending);
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
