using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class EmployeesWorks
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public int TypeOfWorkId { get; set; }

        [NotMapped]
        public Employees Employee { get; set; }

        [NotMapped]
        public TypeOfWork TypeOfWork { get; set; }
    }
}
