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
    public class RepairOrdersController : ControllerBase
    {
        private BaseDBContext _dbContext;
        public RepairOrdersController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<RepairOrders> GetRepairOrders()
        {
            return _dbContext.RepairOrders.ToList();
        }

        [HttpPost]
        public IActionResult SaveRepairOrders([FromBody] RepairOrders repairOrders)
        {
            try
            {
                _dbContext.RepairOrders.Add(repairOrders);
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
