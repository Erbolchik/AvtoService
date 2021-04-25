using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class CommentsForOrder
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int RepairOrderId { get; set; }

        public DateTime Date { get; set; }

        public int EmployeeId { get; set; }
    }
}
