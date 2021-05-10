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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cars>()
                .HasOne(s => s.Clients)
                .WithMany(c => c.Cars)
                .HasForeignKey(c => c.ClientId);

            modelBuilder.Entity<UserRoles>()
            .HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<UserRoles>()
                .HasOne(ur => ur.Users)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);
            modelBuilder.Entity<UserRoles>()
                .HasOne(ur => ur.Roles)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<RoleTasks>()
                .HasKey(rt => new { rt.RoleId, rt.TaskId });
            modelBuilder.Entity<RoleTasks>()
                .HasOne(rt => rt.Roles)
                .WithMany(r => r.RoleTasks)
                .HasForeignKey(rt => rt.RoleId);
            modelBuilder.Entity<RoleTasks>()
                .HasOne(rt => rt.Tasks)
                .WithMany(t => t.RoleTasks)
                .HasForeignKey(rt => rt.TaskId);

            modelBuilder.Entity<Users>()
               .HasOne(u => u.Clients)
               .WithOne(tc => tc.Users)
               .HasForeignKey<Clients>(tc => tc.UserId);

            modelBuilder.Entity<Users>()
                .HasOne(s => s.Employees)
                .WithOne(u => u.Users)
                .HasForeignKey<Employees>(u => u.UserId);
        }


        public DbSet<Employees> Employees { get; set; }

        public DbSet<Clients> Clients { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<TypeOfWork> TypeOfWork { get; set; }

        public DbSet<Cars> Cars { get; set; }

        public DbSet<CommentsForOrder> CommentsForOrder { get; set; }

        public DbSet<RepairOrders> RepairOrders { get; set; }

        public DbSet<EmployeesWorks> EmployeesWorks { get; set; }

        public DbSet<ServiceSpending> ServiceSpendings { get; set; }

        public DbSet<Roles> Roles { get; set; }
    }
}
