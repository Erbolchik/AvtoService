using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Tasks
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IconName { get; set; }
        public int? Priority { get; set; }
        public virtual IList<RoleTasks> RoleTasks { get; set; } = new List<RoleTasks>();
    }
}
