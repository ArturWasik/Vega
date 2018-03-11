using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Vega.Persistence
{
    public class VegaDbContext : DbContext
    {
	    public VegaDbContext(DbContextOptions<VegaDbContext> options) 
		    : base(options)
	    {
		    
	    }
    }
}
