﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    [Route("api/vehicles")]
    public class VehiclesController : Controller
    {
		private readonly IMapper mapper;

	    private readonly VegaDbContext context;
	    private readonly IVehicleRepository repository;

	    public VehiclesController(IMapper mapper, VegaDbContext context, IVehicleRepository repository)
		{
			this.repository = repository;
			this.context = context;
		    this.mapper = mapper;
	    }

		[HttpPost]
	    public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource saveVehicleResource)
	    {
		    if (!ModelState.IsValid)
		    {
			    return BadRequest(ModelState);
		    }

		    var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource);
			vehicle.LastUpdate = DateTime.Now;

		    repository.Add(vehicle);
		    await context.SaveChangesAsync();

		    await context.Models.Include(m => m.Make).SingleOrDefaultAsync(m => m.Id == vehicle.ModelId);

		    vehicle = await repository.GetVehicle(vehicle.Id);

			var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

		    return Ok(result);
	    }

	    [HttpPut("{id}")]
	    public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource saveVehicleResource)
	    {
		    if (!ModelState.IsValid)
		    {
			    return BadRequest(ModelState);
		    }

		    var vehicle = await repository.GetVehicle(id);

			if (vehicle == null)
		    {
			    return NotFound();
		    }

			mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource, vehicle);

		    vehicle.LastUpdate = DateTime.Now;

		    await context.SaveChangesAsync();

		    var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

		    return Ok(result);
	    }

		[HttpDelete("{id}")]
	    public async Task<IActionResult> DeleteVehicle(int id)
		{
			var vehicle = await repository.GetVehicle(id, includeRelated: false);

			if (vehicle == null)
			{
				return NotFound();
			}

			repository.Remove(vehicle);
			await context.SaveChangesAsync();

			return Ok(id);
		}
		
		[HttpGet("{id}")]
	    public async Task<IActionResult> GetVehicle(int id)
		{
			var vehicle = await repository.GetVehicle(id);

		    if (vehicle == null)
		    {
			    return NotFound();
		    }

		    var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

		    return Ok(vehicleResource);
	    }
	}
}