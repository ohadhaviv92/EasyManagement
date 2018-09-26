using _BAL;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        [HttpPost]
        [ActionName("sendInvite")]
        public object PostSendInvite([FromBody]InviteDetails detail)
        {
            return Bal.Instance.SendInvite(detail.SiteId,detail.SenderId, detail.Reciver, detail.UserType );
        }

        [HttpPost]
        [ActionName("getSentInvites")]
        public List<UserInSite> PostSentInvites([FromBody]User user)
        {
            return Bal.Instance.GetSentInvites(user.UserId);
        }

        [HttpPost]
        [ActionName("getRecivedInvites")]
        public List<UserInSite> PostGetRecivedInvites([FromBody]User user)
        {
            return Bal.Instance.GetRecivedInvites(user.UserId);
        }

        [HttpPost]
        [ActionName("DeleteInvite")]
        public void DeleteInvite([FromBody]JObject invite)
        {
            Bal.Instance.DeleteInvite((int)invite["siteId"] , (int)invite["senderId"] , (int)invite["reciverId"]);
        }

        [HttpPost]
        [ActionName("RejectInvite")]
        public void PostRejectInvite([FromBody]JObject invite)
        {
            Bal.Instance.RejectInvite((int)invite["siteId"], (int)invite["senderId"], (int)invite["reciverId"]);
        }

        [HttpPost]
        [ActionName("ConfirmInvite")]
        public UserInSite PostConfirmInvite([FromBody]JObject invite)
        {
            return Bal.Instance.ConfirmInvite((int)invite["siteId"], (int)invite["senderId"], (int)invite["reciverId"]);
        }

        [HttpPost]
        [ActionName("AddNewSite")]
        public BuildingSite PostAddNewSite([FromBody]JObject site)
        {
            return Bal.Instance.AddNewSite((int)site["userID"], (string)site["siteName"], (string)site["siteAddress"]);
        }

        [HttpPost]
        [ActionName("ChangeSiteStatus")]
        public BuildingSite ChangeSiteStatus([FromBody]JObject site)
        {
            return Bal.Instance.ChangeSiteStatus((int)site["siteID"], (int)site["statusID"]);
        }

        [HttpGet]
        [ActionName("roomsType")]
        public List<RoomType> GetRoomsType()
        {
            return Bal.Instance.GetRoomTypes();
        }


        [HttpGet]
        [ActionName("UploadImg")]
        public void UploadImg([FromBody]JObject data)
        {

             Bal.Instance.uploadImg((string)data["base64"], (string)data["imgName"], (string)data["imgRef"]);
        }
    }
}
