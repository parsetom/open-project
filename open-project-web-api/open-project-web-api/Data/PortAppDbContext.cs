using Microsoft.EntityFrameworkCore;
using open_project_web_api.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace open_project_web_api.Data
{
    public class PortAppDbContext : DbContext
    {
        public DbSet<Exposure> Exposures { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            var config = Configuration.GetInstance();
            var connectionString = config["ConnectionStrings:Portfolio.Database.Objects"];
            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var exposureEntity = modelBuilder.Entity<Exposure>();
            exposureEntity.HasKey(e => e.ID);
            exposureEntity.Property(e => e.ShortDesc).HasMaxLength(50).IsRequired();
            exposureEntity.Property(e => e.LongDesc).HasMaxLength(255);

            var projectsEntity = modelBuilder.Entity<Project>();
            projectsEntity.HasKey(e => e.ID);
            projectsEntity.HasIndex("ShortDesc", "StartDate").IsUnique();
            projectsEntity.Property(e => e.ShortDesc).HasMaxLength(50).IsRequired();
            projectsEntity.Property(e => e.LongDesc).HasMaxLength(255);
            projectsEntity.Property(e => e.StartDate).IsRequired();
            projectsEntity.HasMany(e => e.Exposures);
        }
    }
}
