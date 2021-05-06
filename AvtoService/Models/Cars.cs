using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class Cars
    {
        public int Id { get; set; }

        public int ClientId { get; set; }

        public string GovernmentNumber { get; set; }

        public string VIN { get; set; }

        public DateTime YearOfIssue { get; set; }

        public string Model { get; set; }

        [NotMapped]
        public Clients Clients { get; set; }

        [NotMapped]
        public List<RepairOrders> RepairOrders { get; set; }

    }
}
