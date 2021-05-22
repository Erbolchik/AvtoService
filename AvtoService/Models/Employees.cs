using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Employees : UserDetails
    {
        public Users Users { get; set; }

        public int? UserId { get; set; }

        [NotMapped]
        public List<TypeOfWork> TypeOfWorks { get; set; }
    }
}
