using HomePort.Identity.Service.Models;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomePort.Test.Services
{
    [TestFixture]
    public class AccountsTests
    {
        [Test]
        public async Task TestRegistration()
        {
            var client = TestHelpers.Client;

            var registration = new RegisterModel
            {
                Email = "test@yopmail.com",
                Password = "pa$$w0rd"
            };

            var content = TestHelpers.GetStringContent(registration);
            var test = await client.GetAsync("/api/accounts");
            var result = await client.PostAsync("/api/accounts", content);
            
        }
    }
}
