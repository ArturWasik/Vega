using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Vega.Core.Models;

namespace Vega.Core
{
	public class PhotoService : IPhotoService
	{
		private readonly IUnitOfWork unitOfWork;

		public PhotoService(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
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

			var photo = new Photo { FileName = fileName };
			vehicle.Photos.Add(photo);
			await unitOfWork.CompleteAsync();

			return photo;
		}
	}
}