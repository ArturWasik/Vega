using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

		public VehiclesController(IMapper mapper, VegaDbContext context)
		{
			this.context = context;
		    this.mapper = mapper;
	    }

	    public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
	    {
		    var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
			vehicle.LastUpdate = DateTime.Now;

		    context.Vehicles.Add(vehicle);
		    await context.SaveChangesAsync();

		    var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

		    return Ok(result);
	    }
    }
}