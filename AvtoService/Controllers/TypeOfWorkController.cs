﻿using AvtoService.Models;
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
        public IEnumerable<TypeOfWork> GetTypeOfWorks()
        {
            return _dbContext.TypeOfWork.ToList();
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
    }
}