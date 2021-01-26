using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace open_project_web_api.Utility
{
    public static class Configuration
    {
        private static IConfigurationRoot _configuration;

        public static IConfigurationRoot GetInstance()
        {
            if (_configuration == null)
            {
                var configFile = Path.Combine(Environment.CurrentDirectory, "appsettings.json");
                var configBuilder = new ConfigurationBuilder()
                    .AddJsonFile(configFile);

                _configuration = configBuilder.Build();
            }
            return _configuration;
        }
    }
}
