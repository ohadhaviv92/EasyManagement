using _BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace WebApplication2.Controllers
{
    public class ServiceController : ApiController
    {

        [HttpGet]
        [ActionName("GetKey")]
        public string GetKey()
        {
            return Bal.Instance.GetKey();
        }

        [HttpGet]
        [ActionName("jobsDetails")]
        public List<JobDetails> GetJobsDetails()
        {
            return Bal.Instance.GetJobs();
        }

        [HttpPost]
        [ActionName("Login")]
        public UserInSites PostLogin([FromBody]User user)
        {
            return Bal.Instance.Login(user.UserName, user.Pass);
        }

        [HttpPost]
        [ActionName("Register")]
        public object PostRegister([FromBody]User user)
        {
            var res = Bal.Instance.Register(user.UserName, user.Pass, user.FirstName, user.LastName, user.Email, user.Tel);
            return res;
        }

        [HttpPost]
        [ActionName("Notify")]
        public void PostNotify([FromBody]User userData)
        {
            Bal.Instance.AddNotification(userData.Email, userData.Token);
        }
    }
}
