using ANADOLU_SİGORTA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ANADOLU_SİGORTA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class OdemeController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public OdemeController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] ODEME_TABLE odeme)
        {
            if (odeme == null)
            {
                return BadRequest("Ödeme bilgileri boş.");
            }

            if (odeme.Kart_No <= 0)
            {
                return BadRequest("Geçersiz kart numarası.");
            }

            if (odeme.CVC <= 0)
            {
                return BadRequest("Geçersiz CVC kodu.");
            }

            _context.ODEME_TABLE.Add(odeme);
            _context.SaveChanges();
            return Ok("Ödeme başarıyla eklendi.");
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var odeme = _context.ODEME_TABLE.Find(id);
            if (odeme == null)
            {
                return NotFound("Ödeme bulunamadı.");
            }

            return Ok(odeme);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ODEME_TABLE odeme)
        {
            if (id != odeme.Odeme_Id)
            {
                return BadRequest("Ödeme ID uyuşmuyor.");
            }

            var existingOdeme = _context.ODEME_TABLE.Find(id);
            if (existingOdeme == null)
            {
                return NotFound("Ödeme bulunamadı.");
            }

            existingOdeme.Police_No = odeme.Police_No;
            existingOdeme.Musteri_No = odeme.Musteri_No;
            existingOdeme.Kart_No = odeme.Kart_No;
            existingOdeme.Kul_Tarih = odeme.Kul_Tarih;
            existingOdeme.CVC = odeme.CVC;

            _context.ODEME_TABLE.Update(existingOdeme);
            _context.SaveChanges();

            return Ok("Ödeme başarıyla güncellendi.");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var odeme = _context.ODEME_TABLE.Find(id);
            if (odeme == null)
            {
                return NotFound("Ödeme bulunamadı.");
            }

            _context.ODEME_TABLE.Remove(odeme);
            _context.SaveChanges();

            return Ok("Ödeme başarıyla silindi.");
        }
    }
}
