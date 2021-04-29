using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class SomeExample
    {
        public string Id { get; private set; }

        public string Name { get; private set; }

        public string Login { get; private set; }

        public string DisplayName { get; private set; }

        public string Email { get; private set; }

        public string PasswordHash { get; private set; }
    }

    public class UserHasRole
    {
        public string RoleId { get; set; }
        public string UserId { get; set; }

        public Role Role { get; set; }
        public RoadUser User { get; set; }
    }
}
