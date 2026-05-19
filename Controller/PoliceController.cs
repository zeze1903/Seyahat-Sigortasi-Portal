using ANADOLU_SİGORTA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ANADOLU_SİGORTA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoliceController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PoliceController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] POLICE_TABLE police)
        {
            if (police == null)
            {
                return BadRequest("Poliçe bilgileri boş.");
            }

            _context.POLICE_TABLE.Add(police);
            _context.SaveChanges();
            return Ok("Poliçe başarıyla eklendi.");
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var police = _context.POLICE_TABLE.Find(id);
            if (police == null)
            {
                return NotFound("Poliçe bulunamadı.");
            }

            return Ok(police);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] POLICE_TABLE police)
        {
            if (id != police.Police_No)
            {
                return BadRequest("Poliçe ID uyuşmuyor.");
            }

            var existingPolice = _context.POLICE_TABLE.Find(id);
            if (existingPolice == null)
            {
                return NotFound("Poliçe bulunamadı.");
            }

            existingPolice.Sigortali_No = police.Sigortali_No;
            existingPolice.Sig_Ettiren_No = police.Sig_Ettiren_No;
            existingPolice.Bedel = police.Bedel;
            existingPolice.Bas_Tarih = police.Bas_Tarih;
            existingPolice.Bit_Tarih = police.Bit_Tarih;
            existingPolice.Teklif_Durum = police.Teklif_Durum;

            _context.POLICE_TABLE.Update(existingPolice);
            _context.SaveChanges();

            return Ok("Poliçe başarıyla güncellendi.");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var police = _context.POLICE_TABLE.Find(id);
            if (police == null)
            {
                return NotFound("Poliçe bulunamadı.");
            }

            _context.POLICE_TABLE.Remove(police);
            _context.SaveChanges();

            return Ok("Poliçe başarıyla silindi.");
        }
    }
}
