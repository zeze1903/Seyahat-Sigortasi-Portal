using System.ComponentModel.DataAnnotations;

namespace ANADOLU_SİGORTA.Models
{
    public class MUSTERI_TABLE
    {
        [Key]
        public string Musteri_No { get; set; } // Birincil anahtar, TC Kimlik No olarak kullanılacak
        public string Ad { get; set; }
        public string Soyad { get; set; }
        public string Email { get; set; }
        public string Cep_Tel { get; set; }
        public DateTime? Dogum_Tarih { get; set; } // Tarih özelliği
    }
}
