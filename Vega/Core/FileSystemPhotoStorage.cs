using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Vega.Core
{
	public class FileSystemPhotoStorage : IPhotoStorage
	{
		public async Task<string> StorePhoto(string uploadsFolderPath, IFormFile file)
		{
			if (!Directory.Exists(uploadsFolderPath))
			{
				Directory.CreateDirectory(uploadsFolderPath);
			}

			var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
			var filepath = Path.Combine(uploadsFolderPath, fileName);

			using (var stream = new FileStream(filepath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			return fileName;
		}
	}
}