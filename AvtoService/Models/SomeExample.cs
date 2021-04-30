using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class SomeExample
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Login { get; set; }

        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; private set; }
    }

}
