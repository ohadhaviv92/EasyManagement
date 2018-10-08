using _DAL;
using Newtonsoft.Json;
using System;

using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using WebPush;

namespace _BAL
{
    public sealed class Bal
    {
        private static VapidDetails _keys;

        private static Bal _instance;
        private static readonly object Padlock = new object();

        public static Bal Instance
        {
            get
            {
                lock (Padlock)
                {
                    if (_instance == null)
                        _instance = new Bal();
                    return _instance;
                }
            }
        }

        private Bal()
        {
            _keys = VapidHelper.GenerateVapidKeys();
        }

        public string GetKey()
        {
            if (_keys == null)
            {
                _keys = VapidHelper.GenerateVapidKeys();
            }
            return _keys.PublicKey;
        }

        public UserInSites Login(string userName, string password)
        {
            var userWithSites = new UserInSites();

            var results = Dal.Login(userName, password);
            if (results == null)
                return null;
            var user = new User
            {
                UserId = int.Parse(results.Rows[0]["userID"].ToString()),
                UserName = results.Rows[0]["userName"].ToString(),
                Pass = results.Rows[0]["pass"].ToString(),
                FirstName = results.Rows[0]["firstName"].ToString(),
                LastName = results.Rows[0]["lastName"].ToString(),
                Email = results.Rows[0]["email"].ToString(),
                Tel = results.Rows[0]["tel"].ToString()
            };

            userWithSites.User = user;

            userWithSites.Sites = GetUserSites(user.UserId);

            for (int i = 0; i < userWithSites.Sites.Count; i++)
            {
                var site = userWithSites.Sites[i];
                userWithSites.Sites[i].Rooms = GetRoomsInSite(site.SiteId);

                for (int j = 0; j < userWithSites.Sites[i].Rooms.Count; j++)
                {
                    var room = userWithSites.Sites[i].Rooms[j];
                    userWithSites.Sites[i].Rooms[j].Faults = GetRoomFaults(room.RoomId);

                    for (int k = 0; k < userWithSites.Sites[i].Rooms[j].Faults.Count; k++)
                    {
                        var owner = userWithSites.Sites[i].Rooms[j].Faults[k].Owner;
                        var worker = userWithSites.Sites[i].Rooms[j].Faults[k].Worker;
                        userWithSites.Sites[i].Rooms[j].Faults[k].Owner = GetUserInSite(owner.UserId, site.SiteId);
                        userWithSites.Sites[i].Rooms[j].Faults[k].Worker = GetUserInSite(worker.UserId, site.SiteId);

                    }
                }
            }
            return userWithSites;

        }

        public List<BuildingSite> GetUserSites(int userId)
        {
            var results = Dal.GetUserSites(userId);
            var sites = new List<BuildingSite>();
            if (results == null)
                return sites;

            for (var i = 0; i < results.Rows.Count; i++)
            {

                var site = new BuildingSite
                {
                    SiteId = int.Parse(results.Rows[i]["siteID"].ToString()),
                    SiteName = results.Rows[i]["siteName"].ToString(),
                    SiteAddress = results.Rows[i]["siteAddress"].ToString(),
                    SiteStatus = bool.Parse(results.Rows[i]["siteStatus"].ToString()),
                    UserTypeId = int.Parse(results.Rows[i]["userTypeID"].ToString()),
                    UserTypeName = results.Rows[i]["userTypName"].ToString(),
                    SiteImage = results.Rows[i]["img"].ToString()
                    
    };
                sites.Add(site);
            }
            return sites;
        }

        public List<Room> GetRoomsInSite(int siteId)
        {
            var rooms = new List<Room>();
            var results = Dal.GetAllRoomsInSite(siteId);
            if (results == null)
                return rooms;

            for (var i = 0; i < results.Rows.Count; i++)
            {
                var room = new Room
                {
                    RoomId = int.Parse(results.Rows[i]["roomID"].ToString()),
                    RoomName = results.Rows[i]["roomName"].ToString(),
                    FloorNumber = int.Parse(results.Rows[i]["floorNumber"].ToString()),
                    RoomTypeId = int.Parse(results.Rows[i]["roomTypeID"].ToString()),
                    RoomTypeName = results.Rows[i]["roomTypeName"].ToString(),
                    RoomPicture = results.Rows[i]["roomPicture"].ToString()
                };
                rooms.Add(room);
            }
            return rooms;
        }

        public User GetUserInSite(int userId, int siteId)
        {
            DataTable results = Dal.GetUserInSite(userId, siteId);
            var user = new User();
            if (results != null)
            {
                user.JobId = int.Parse(results.Rows[0]["userTypeID"].ToString());
                user.JobName = results.Rows[0]["userTypName"].ToString();
                user.UserName = results.Rows[0]["userName"].ToString();
                user.FirstName = results.Rows[0]["firstName"].ToString();
                user.LastName = results.Rows[0]["lastName"].ToString();
                user.Email = results.Rows[0]["email"].ToString();
                user.Tel = results.Rows[0]["tel"].ToString();
                user.Img = results.Rows[0]["img"].ToString();
            }
            return user;
        }

        public List<Fault> GetRoomFaults(int roomId)
        {
            var faults = new List<Fault>();
            var faultsResults = Dal.GetAllFaultsInRoom(roomId);
            if (faultsResults != null)
            {
                for (var k = 0; k < faultsResults.Rows.Count; k++)
                {
                    var fault = new Fault
                    {
                        Owner = new User
                        {
                            UserId = int.Parse(faultsResults.Rows[k]["ownerID"].ToString())
                        },
                        Worker = new User
                        {
                            UserId = int.Parse(faultsResults.Rows[k]["workerID"].ToString())
                        },
                        FaultId = int.Parse(faultsResults.Rows[k]["faultID"].ToString()),
                        FaultTypeId = int.Parse(faultsResults.Rows[k]["faultType"].ToString()),
                        FaultName = faultsResults.Rows[k]["faultName"].ToString(),
                        FaultStatus = bool.Parse(faultsResults.Rows[k]["faultStatus"].ToString()),
                        Info = faultsResults.Rows[k]["info"].ToString(),
                        OpenDate = DateTime.Parse(faultsResults.Rows[k]["openDate"].ToString()),
                    };
                    if (faultsResults.Rows[k]["closeDate"].ToString() != "")
                        fault.CloseDate = DateTime.Parse(faultsResults.Rows[k]["closeDate"].ToString());
                    faults.Add(fault);
                }
            }
            return faults;
        }

        public List<JobDetails> GetJobs()
        {
            var details = Dal.GetJobs();
            if (details == null)
                return null;

            List<JobDetails> jobs = new List<JobDetails>();
            for (var i = 0; i < details.Rows.Count; i++)
            {

                var job = new JobDetails
                {
                    userTypeID = int.Parse(details.Rows[i]["userTypeID"].ToString()),
                    userTypeName = details.Rows[i]["userTypName"].ToString()
                };
                jobs.Add(job);
            }
            return jobs;


        }

        public object Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
            DataTable results = Dal.Register(userName, pass, firstName, lastName, email, tel);
            if (results == null)
                return null;

            if (results.Columns.Count > 1)
            {
                User user = new User
                {
                    UserId = int.Parse(results.Rows[0]["userID"].ToString()),
                    UserName = results.Rows[0]["userName"].ToString(),
                    Pass = results.Rows[0]["pass"].ToString(),
                    FirstName = results.Rows[0]["firstName"].ToString(),
                    LastName = results.Rows[0]["lastName"].ToString(),
                    Email = results.Rows[0]["email"].ToString(),
                    Tel = results.Rows[0]["tel"].ToString()
                };

                return user;
            }
            var error = new { Error = results.Rows[0][0].ToString() };
            return error;

        }

        public void AddNotification(string email, string Token)
        {
            Dal.UpdateNotificationKey(email, Token);
        }

        private static void Notify(string email, string title, string message)
        {

            var details = Dal.GetNotificationKeys(email);
            if (details == null)
                return;


            string token = details.Rows[0]["Token"].ToString();
            using (var client = new WebClient())
            {

                var values = new NameValueCollection();
                values["to"] = token;
                values["title"] = title;
                values["body"] = message;
                var response = client.UploadValues("https://exp.host/--/api/v2/push/send", values);

            }

        }

        public object SendInvite(int siteId, int senderId, string reciver, int userType)
        {
            var results = Dal.Invite(siteId, senderId, reciver, userType);
            if (results.Columns.Count <= 1)
                return new { Error = results.Rows[0][0].ToString() };
            var user = new User
            {
                UserId = int.Parse(results.Rows[0]["userID"].ToString()),
                UserName = results.Rows[0]["userName"].ToString(),
                FirstName = results.Rows[0]["firstName"].ToString(),
                LastName = results.Rows[0]["lastName"].ToString(),
                Email = results.Rows[0]["email"].ToString(),
            };
            string sitename = Dal.GetSiteName(siteId);
            Notify(user.Email, "New Invite", $"you have been invited to {sitename}");
            return user;
        }

        public List<UserInSite> GetSentInvites(int userId)
        {
            var results = Dal.GetSentInvites(userId);
            if (results == null)
                return null;
            List<UserInSite> InvitedUsers = new List<UserInSite>();

            for (int i = 0; i < results.Rows.Count; i++)
            {

                var user = new User
                {
                    UserId = int.Parse(results.Rows[i]["userID"].ToString()),
                    UserName = results.Rows[i]["userName"].ToString(),
                    FirstName = results.Rows[i]["firstName"].ToString(),
                    LastName = results.Rows[i]["lastName"].ToString(),
                    Email = results.Rows[i]["email"].ToString(),
                    Img = results.Rows[i]["img"].ToString(),

                };

                var site = new BuildingSite
                {
                    SiteAddress = results.Rows[i]["siteAddress"].ToString(),
                    SiteId = int.Parse(results.Rows[i]["siteID"].ToString()),
                    SiteName = results.Rows[i]["siteName"].ToString(),
                    UserTypeName = results.Rows[i]["userTypName"].ToString(),
                    UserTypeId = int.Parse(results.Rows[i]["userTypeID"].ToString())
                };
                InvitedUsers.Add(new UserInSite { user = user, Site = site });
            }
            return InvitedUsers;

        }

        public List<UserInSite> GetRecivedInvites(int userId)
        {
            var results = Dal.GetRecivedInvites(userId);
            if (results == null)
                return null;
            List<UserInSite> InvitedUsers = new List<UserInSite>();

            for (int i = 0; i < results.Rows.Count; i++)
            {

                var user = new User
                {
                    UserId = int.Parse(results.Rows[i]["userID"].ToString()),
                    UserName = results.Rows[i]["userName"].ToString(),
                    FirstName = results.Rows[i]["firstName"].ToString(),
                    LastName = results.Rows[i]["lastName"].ToString(),
                    Email = results.Rows[i]["email"].ToString(),
                    Img = results.Rows[i]["img"].ToString(),

                };

                var site = new BuildingSite
                {
                    SiteAddress = results.Rows[i]["siteAddress"].ToString(),
                    SiteId = int.Parse(results.Rows[i]["siteID"].ToString()),
                    SiteName = results.Rows[i]["siteName"].ToString(),
                    UserTypeName = results.Rows[i]["userTypName"].ToString(),
                    UserTypeId = int.Parse(results.Rows[i]["userTypeID"].ToString())
                };
                InvitedUsers.Add(new UserInSite { user = user, Site = site });
            }
            return InvitedUsers;

        }

        public void DeleteInvite(int siteId, int senderId, int reciverId)
        {
            Dal.DeleteInvite(siteId, senderId, reciverId);
        }

        public void RejectInvite(int siteId, int senderId, int reciverId)
        {
            Dal.RejectInvite(siteId, senderId, reciverId);
        }

        public BuildingSite AddNewSite(int userID, string siteName, string siteAddress, string base64, string imgName)
        {
            var result = Dal.AddNewSite(userID, siteName, siteAddress, base64, imgName);

            if (result == null)
                return null;


            var site = new BuildingSite
            {
                SiteId = int.Parse(result.Rows[0]["siteID"].ToString()),
                SiteName = result.Rows[0]["siteName"].ToString(),
                SiteAddress = result.Rows[0]["siteAddress"].ToString(),
                SiteStatus = bool.Parse(result.Rows[0]["siteStatus"].ToString()),
                UserTypeId = int.Parse(result.Rows[0]["userTypeID"].ToString()),
                UserTypeName = result.Rows[0]["userTypName"].ToString(),
                Rooms = new List<Room>()
            };


            return site;
        }


        public UserInSite ConfirmInvite(int siteId, int senderId, int reciverId)
        {
            DataTable res = Dal.ConfirmInvite(siteId, senderId, reciverId);
            if (res == null)
                return null;


            var site = new BuildingSite
            {
                SiteName = res.Rows[0]["siteName"].ToString(),
                SiteId = int.Parse(res.Rows[0]["SiteID"].ToString()),
                SiteAddress = res.Rows[0]["SiteAddress"].ToString(),
                UserTypeId = int.Parse(res.Rows[0]["userTypeID"].ToString()),
                UserTypeName = res.Rows[0]["userTypName"].ToString(),
                SiteStatus = true
            };

            site.Rooms = getSiteRooms(siteId);

            var user = new User
            {
                Email = res.Rows[0]["email"].ToString(),
                UserName = res.Rows[0]["userName"].ToString(),
                FirstName = res.Rows[0]["firstName"].ToString(),
                LastName = res.Rows[0]["lastName"].ToString(),
                Tel = res.Rows[0]["tel"].ToString(),
                Img = res.Rows[0]["img"].ToString(),
                UserId = int.Parse(res.Rows[0]["userID"].ToString())
            };

            var userInSite = new UserInSite
            {
                user = user,
                Site = site
            };

            Notify(res.Rows[0]["OwnerEmail"].ToString(), "Invitation accepted", $"{user.FirstName} {user.LastName} has accepted your invite");

            return userInSite;
        }

        private List<Room> getSiteRooms(int siteId)
        {
            List<Room> rooms = GetRoomsInSite(siteId);

            for (int i = 0; i < rooms.Count; i++)
            {
                rooms[i].Faults = GetRoomFaults(rooms[i].RoomId);

                for (int j = 0; j < rooms[i].Faults.Count; j++)
                {
                    var owner = rooms[i].Faults[j].Owner;
                    var worker = rooms[i].Faults[j].Worker;
                    rooms[i].Faults[j].Owner = GetUserInSite(owner.UserId, siteId);
                    rooms[i].Faults[j].Worker = GetUserInSite(worker.UserId, siteId);

                }
            }

            return rooms;
        }

        public BuildingSite ChangeSiteStatus(int siteID, int statusID)
        {
            var result = Dal.ChangeSiteStatus(siteID, statusID);

            if (result == null)
                return null;


            var site = new BuildingSite
            {
                SiteId = int.Parse(result.Rows[0]["siteID"].ToString()),
                SiteName = result.Rows[0]["siteName"].ToString(),
                SiteAddress = result.Rows[0]["siteAddress"].ToString(),
                SiteStatus = bool.Parse(result.Rows[0]["siteStatus"].ToString()),
                UserTypeId = 0,
                UserTypeName = null,
                Rooms = new List<Room>()
            };


            return site;
        }


        public List<RoomType> GetRoomTypes()
        {
            var details = Dal.GetRoomsTypes();
            if (details == null)
                return null;

            List<RoomType> roomsType = new List<RoomType>();
            for (var i = 0; i < details.Rows.Count; i++)
            {

                var roomType = new RoomType
                {
                    RoomTypeId = int.Parse(details.Rows[i]["roomTypeID"].ToString()),
                    RoomTypeName = details.Rows[i]["roomTypeName"].ToString()
                };
                roomsType.Add(roomType);
            }
            return roomsType;


        }

        public void uploadImg(string base64, string imgName, string imgRef)
        {
            string ImgName = $"Images/{new DateTime()}.jpg";
            String path = HttpContext.Current.Server.MapPath($"~/"); //Path


            //set the image path
            string imgPath = Path.Combine(path, ImgName);
            byte[] imageBytes = Convert.FromBase64String(base64);


            using (Image image = Image.FromStream(new MemoryStream(imageBytes)))
            {
                image.Save(imgPath, ImageFormat.Jpeg);
            }

            string returnPath = $"http://ruppinmobile.tempdomain.co.il/site04/Images/" + ImgName;


            Dal.uploadImg(returnPath);
        }


        public void OutFromSite(int siteID, int userID)
        {

            Dal.OutFromSite(siteID, userID);

        }

        public Room AddRoom(int siteId, int roomTypeId, string roomName, int floorNumber, string base64image = null)
        {
            var result = Dal.AddRoom(siteId, roomTypeId, roomName, floorNumber);

            if (result == null)
                return null;


            var room = new Room
            {
                RoomId = int.Parse(result.Rows[0]["roomID"].ToString()),
                RoomTypeId = int.Parse(result.Rows[0]["roomTypeID"].ToString()),
                RoomTypeName = result.Rows[0]["roomTypeName"].ToString(),
                RoomName = result.Rows[0]["roomName"].ToString(),
                FloorNumber = int.Parse(result.Rows[0]["floorNumber"].ToString()),
                Faults = new List<Fault>()
            };
            if(base64image != null)
            {
                room.RoomPicture = $"/{siteId}/{room.RoomId}.jpg";
                Dal.UpdateRoomPicture(room.RoomId, room.RoomPicture);
            }
           

            return room;
        }
    }
}
