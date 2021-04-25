using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class RepairOrders
    {
        public int Id { get; set; }

        public double Mileage { get; set; }

        public DateTime RegistrationDate { get; set; }

        public int EmployeeId { get; set; }

        public double TheAmountsOfParts { get; set; }

        public double TheAmountsOfWorks { get; set; }

        public bool IsPaidUp { get; set; }
    }
}
