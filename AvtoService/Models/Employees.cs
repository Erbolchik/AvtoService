using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Employees : UserDetails
    {
        public Users Users { get; set; }
    }
}
