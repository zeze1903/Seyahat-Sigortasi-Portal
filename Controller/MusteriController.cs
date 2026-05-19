using Microsoft.AspNetCore.Mvc;
using ANADOLU_SİGORTA.Models;
using System.Linq;

namespace ANADOLU_SİGORTA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusteriController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MusteriController(DatabaseContext context)
        {
            _context = context;
        }

        // Kayıt (POST) işlemi
        [HttpPost("register")]
        public IActionResult Register([FromBody] MUSTERI_TABLE musteri)
        {
            if (musteri == null)
            {
                return BadRequest("Müşteri bilgileri boş.");
            }

            // Eğer aynı TC Kimlik No ile kayıtlı müşteri varsa, hata döndür
            var existingMusteri = _context.MUSTERI_TABLE
                                          .FirstOrDefault(m => m.Musteri_No == musteri.Musteri_No);
            if (existingMusteri != null)
            {
                return BadRequest("Bu TC Kimlik Numarası ile kayıtlı bir müşteri mevcut.");
            }

            _context.MUSTERI_TABLE.Add(musteri);
            _context.SaveChanges();
            return Ok("Müşteri başarıyla eklendi.");
        }

        // Müşteri bilgilerini getir (GET) işlemi
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var musteri = _context.MUSTERI_TABLE.Find(id);
            if (musteri == null)
            {
                return NotFound("Müşteri bulunamadı.");
            }

            return Ok(musteri);
        }

        // Müşteri bilgilerini güncelle (PUT) işlemi
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] MUSTERI_TABLE musteri)
        {
            if (id != musteri.Musteri_No)
            {
                return BadRequest("Müşteri ID uyuşmuyor.");
            }

            var existingMusteri = _context.MUSTERI_TABLE.Find(id);
            if (existingMusteri == null)
            {
                return NotFound("Müşteri bulunamadı.");
            }

            existingMusteri.Ad = musteri.Ad;
            existingMusteri.Soyad = musteri.Soyad;
            existingMusteri.Email = musteri.Email;
            existingMusteri.Cep_Tel = musteri.Cep_Tel;
            existingMusteri.Dogum_Tarih = musteri.Dogum_Tarih;

            _context.MUSTERI_TABLE.Update(existingMusteri);
            _context.SaveChanges();

            return Ok("Müşteri başarıyla güncellendi.");
        }

        // Müşteri silme (DELETE) işlemi
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var musteri = _context.MUSTERI_TABLE.Find(id);
            if (musteri == null)
            {
                return NotFound("Müşteri bulunamadı.");
            }

            _context.MUSTERI_TABLE.Remove(musteri);
            _context.SaveChanges();

            return Ok("Müşteri başarıyla silindi.");
        }
    }
}
