using Microsoft.EntityFrameworkCore;

namespace ANADOLU_SİGORTA.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<MUSTERI_TABLE> MUSTERI_TABLE { get; set; }
        public DbSet<POLICE_TABLE> POLICE_TABLE { get; set; }
     
        public DbSet<ODEME_TABLE> ODEME_TABLE { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // İlişkileri tanımlamak için Fluent API kullanımı

            modelBuilder.Entity<POLICE_TABLE>()
                .HasOne<MUSTERI_TABLE>(p => p.Sigortali)
                .WithMany()
                .HasForeignKey(p => p.Sigortali_No)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<POLICE_TABLE>()
                .HasOne<MUSTERI_TABLE>(p => p.Sig_Ettiren)
                .WithMany()
                .HasForeignKey(p => p.Sig_Ettiren_No)
                .OnDelete(DeleteBehavior.Restrict);

         
        }
    }
}
