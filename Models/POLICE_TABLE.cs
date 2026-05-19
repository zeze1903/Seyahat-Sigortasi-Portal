using System.ComponentModel.DataAnnotations;

namespace ANADOLU_SİGORTA.Models
{
    public class POLICE_TABLE
    {
        [Key]
        public int Police_No { get; set; }
        public string Sigortali_No { get; set; }
        public string Sig_Ettiren_No { get; set; }
        public decimal Bedel { get; set; }
        public DateTime Bas_Tarih { get; set; }
        public DateTime Bit_Tarih { get; set; }
        public bool Teklif_Durum { get; set; }

        // Navigasyon özellikleri
        public MUSTERI_TABLE Sigortali { get; set; }
        public MUSTERI_TABLE Sig_Ettiren { get; set; }
    }
}
