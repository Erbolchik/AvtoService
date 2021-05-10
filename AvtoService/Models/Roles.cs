using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Roles
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public virtual IList<UserRoles> UserRoles { get; set; } = new List<UserRoles>();
        public virtual IList<RoleTasks> RoleTasks { get; set; } = new List<RoleTasks>();
    }
}
