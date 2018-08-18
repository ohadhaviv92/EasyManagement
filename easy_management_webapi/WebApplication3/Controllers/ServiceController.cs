using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _BAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace WebApplication3.Controllers
{
    [Produces("application/json")]
   public class ServiceController : Controller
    {
        
        [Route("/getkey")]
        public string GetKey()
        {
            return Bal.Instance.GetKey();
        }

        [Route("/login")]
        public UserInSites PostLogin([FromBody]User user)
        {
            return Bal.Instance.Login(user.UserName, user.Pass);
        }

        [Route("/register")]
        public object PostRegister([FromBody]User user)
        {
            var res = Bal.Instance.Register(user.UserName, user.Pass, user.FirstName, user.LastName, user.Email, user.Tel);
            return res;
        }

        [Route("/notify")]
        public void UpdateNotification([FromBody]User userData)
        {
            Bal.Instance.AddNotification(userData.Email, userData.Endpoint, userData.P256Dh, userData.Auth);
        }
    }
}