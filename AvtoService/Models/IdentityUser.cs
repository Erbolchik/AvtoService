using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class IdentityUser
    {
        public int? Id { get; set; }
        public string[] tasks { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
