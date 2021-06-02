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
    public class CommentsForOrderController : ControllerBase
    {
        private BaseDBContext _dbContext;

        public CommentsForOrderController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<CommentsForOrder> GetCommentsForOrders()
        {
            return _dbContext.CommentsForOrder.ToList();
        }

        [HttpPost]
        public IActionResult SaveGetCommentsForOrder([FromBody] CommentsForOrder commentsForOrder)
        {
            try
            {
                _dbContext.CommentsForOrder.Add(commentsForOrder);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCommentsForOrder(int id)
        {
            try
            {
                var commentForOrder = _dbContext.CommentsForOrder.SingleOrDefault(c => c.Id == id);
                _dbContext.CommentsForOrder.Remove(commentForOrder);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateCommentsForOrder(CommentsForOrder commentForOrder)
        {
            try
            {
                _dbContext.CommentsForOrder.Update(commentForOrder);
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
