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
    public class TypeOfWorkController : ControllerBase
    {
        private BaseDBContext _dbContext;
        public TypeOfWorkController(BaseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetTypeOfWorks()
        {
            try
            {
                return Ok(_dbContext.TypeOfWork.ToList());
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }

        [HttpPost]
        public IActionResult SaveTypeOfWorks([FromBody] TypeOfWork typeOfWork)
        {
            try
            {
                _dbContext.TypeOfWork.Add(typeOfWork);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTypeOfWork(int id)
        {
            try
            {
                var typeOfWork = _dbContext.TypeOfWork.SingleOrDefault(c => c.Id == id);
                _dbContext.TypeOfWork.Remove(typeOfWork);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult UpdateTypeOfWork([FromBody] TypeOfWork typeOfWork)
        {
            try
            {
                _dbContext.TypeOfWork.Update(typeOfWork);
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
