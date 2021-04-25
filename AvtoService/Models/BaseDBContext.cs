using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvtoService.Models
{
    public class BaseDBContext : DbContext
    {
        public BaseDBContext(DbContextOptions<BaseDBContext> options) : base(options)
        {

        }

        public DbSet<Employees> Employees { get; set; }

        public DbSet<Clients> Clients { get; set; }

        public DbSet<TypeOfWork> TypeOfWork { get; set; }

        public DbSet<Cars> Cars { get; set; }

        public DbSet<CommentsForOrder> CommentsForOrder { get; set; }

        public DbSet<RepairOrders> RepairOrders { get; set; }

        public DbSet<EmployeesWorks> EmployeesWorks { get; set; }

    }
}
