using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ANADOLU_SİGORTA.Models
{
    public class ODEME_TABLE
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Otomatik artan
        public int Odeme_Id { get; set; }
        public int Police_No { get; set; }
        public string Musteri_No { get; set; }
        public long Kart_No { get; set; }
        public DateTime Kul_Tarih { get; set; }
        public int CVC { get; set; }
    }
}
