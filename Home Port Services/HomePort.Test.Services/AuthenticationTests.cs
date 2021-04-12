using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace HomePort.Test.Services
{
    [TestFixture]
    public class AuthenticationTests
    {
        [Test]
        public async Task TestTokenEndpoint()
        {
            var client = TestHelpers.Client;


            var request = new HttpRequestMessage(HttpMethod.Post, "/connect/token");
            request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["grant_type"] = "password",
                ["username"] = "joseph.abel.delacruz@outlook.com",
                ["password"] = "ZHUv_Vb6:xCHzcu"
            });

            var response = await client.SendAsync(request, HttpCompletionOption.ResponseContentRead);
            
        }
    }
}
