using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Clients : UserDetails
    {
        public Users Users { get; set; }

        [NotMapped]
        public List<Cars> Cars { get; set; }
    }
}
