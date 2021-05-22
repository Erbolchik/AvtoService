using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class TypeOfWork
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Employees Employees { get; set; }

    }
}
