using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

namespace ChunkBackground.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChunkController : ControllerBase
    {
        [HttpPost]
        [Route("UploadFile")]
        public async Task<bool> createFile(IFormFile file, [FromForm] string numberChunk)
        {
            try
             {
                if (!Directory.Exists("temp"))
                {
                    Directory.CreateDirectory("temp");
                }
                 using (var fileStream = new FileStream($"temp/temp{numberChunk}", FileMode.Create))
                 {
                     await file.CopyToAsync(fileStream);
                 }
                 return true;
             }
             catch
             {
                 return false;
             }
        }
    }
}
