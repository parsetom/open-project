using HomePort.Identity.Service;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HomePort.Test.Services
{
    [SetUpFixture]
    public class TestHelpers
    {
        private const string TestUrl = "https://localhost:44369/";
        private static TestServer _server;
        private static HttpClient _client;

        [OneTimeSetUp]
        public async Task SetUp()
        {
            var startupAssembly = typeof(Startup).GetTypeInfo().Assembly;
            var contentRoot = GetProjectPath(startupAssembly);

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(contentRoot);

            var testHost = await Host.CreateDefaultBuilder()
                .UseContentRoot(contentRoot)
                .UseEnvironment("Development")
                .ConfigureWebHostDefaults(options =>
                {
                    options.UseTestServer();
                    options.UseStartup<Startup>();
                    options.UseUrls(TestUrl);
                })
                .StartAsync();

            _server = testHost.GetTestServer();
        }

        public static HttpClient Client
        {
            get
            {
                if (_client == null)
                {
                    _client = _server.CreateClient();
                    _client.BaseAddress = new Uri(TestUrl);
                    _client.DefaultRequestHeaders.Accept.Clear();
                    _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                }

                return _client;
            }
        }

        public void Dispose()
        {
            _client.Dispose();
            _server.Dispose();
            _client = null;
            _server = null;
        }

        public static string GetProjectPath(Assembly startupAssembly)
        {
            var projectName = startupAssembly.GetName().Name;

            var applicationBasePath = AppContext.BaseDirectory;

            var directoryInfo = new DirectoryInfo(applicationBasePath);

            do
            {
                // Let's keep on moving upward until we find what we have
                directoryInfo = directoryInfo.Parent;

                var projectDirectoryInfo = new DirectoryInfo(directoryInfo.FullName);

                if (projectDirectoryInfo.Exists)
                {
                    // If it exists let's check if we can find the project name we are looking
                    if (new FileInfo(Path.Combine(projectDirectoryInfo.FullName, projectName, $"{projectName}.csproj")).Exists)
                    {
                        // If yes return otherwise continue
                        return Path.Combine(projectDirectoryInfo.FullName, projectName);
                    }
                }

            }
            while (directoryInfo.Parent != null);

            throw new Exception($"Project root could not be located using the application root {applicationBasePath}.");
        }

        public static StringContent GetStringContent(object obj)
        {
            var jsonObject = JsonConvert.SerializeObject(obj);

            var result = new StringContent(jsonObject, Encoding.UTF8, "application/json");
            return result;
        }
    }
}