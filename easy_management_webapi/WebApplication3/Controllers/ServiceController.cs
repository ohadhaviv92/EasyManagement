using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _BAL;
using Microsoft.AspNetCore.Http;
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
            return BAL.Instance.GetKey();
        }

        [Route("/login")]
        public User PostLogin([FromBody]User user)
        {
            return BAL.Instance.Login(user.userName, user.pass);
        }

        [Route("/register")]
        public object PostRegister([FromBody]User user)
        {
            object res = BAL.Instance.Register(user.userName, user.pass, user.firstName, user.lastName, user.email, user.tel);
            return res;
        }

        [Route("/notify")]
        public void UpdateNotification([FromBody]JObject UserToken)
        {
            User user = UserToken["user"].ToObject<User>();
            Token token = UserToken["token"].ToObject<Token>();
            BAL.Instance.AddNotification(user.email, token);
        }
    }
}