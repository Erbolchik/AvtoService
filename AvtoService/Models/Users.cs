using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Users
    {
        public int? Id { get; set; }
        public string Phone { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime RegistrationDate { get; set; }

        //public virtual IList<UserRoles> UserRoles { get; set; } = new List<UserRoles>();
        public Clients Clients { get; set; }
        public Employees Employees { get; set; }
    }
}
