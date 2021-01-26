using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace open_project_web_api.Data
{
    public class Project
    {
        public int ID { get; set; }
        public string ShortDesc { get; set; }
        public string LongDesc { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ICollection<Exposure> Exposures { get; set; }
    }
}
