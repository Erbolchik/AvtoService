using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class RoleTasks
    {
        public int RoleId { get; set; }
        public int TaskId { get; set; }
        public Roles Roles { get; set; }
        public Tasks Tasks { get; set; }
    }
}
