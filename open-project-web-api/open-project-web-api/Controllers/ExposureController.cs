using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using open_project_web_api.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace open_project_web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExposureController : ControllerBase
    {
        public Exposure GetExposures()
        {
            throw new NotImplementedException();
        }
    }
}
