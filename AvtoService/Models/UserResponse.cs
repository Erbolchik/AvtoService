using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class UserResponse
    {
        public string FullName { get; set; }
        
        public string Phone { get; set; }
        
        public string Login { get; set; }
        
        public string Email { get; set; }
        
        public string RoleName { get; set; }

        public DateTime RegistrationName { get; set; }

    }
}
