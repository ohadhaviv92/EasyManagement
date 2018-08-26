using _DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
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
                    UserTypeName = results.Rows[i]["userTypName"].ToString()
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

        public void AddNotification(string email, string endpoint, string p256dh, string auth)
        {
            Dal.UpdateNotificationKey(email, endpoint, p256dh, auth);

            Notify(email, "test", "test of this notification");
        }

        private static void Notify(string email, string title, string message)
        {

            var details = Dal.GetNotificationKeys(email);
            if (details == null)
                return;


            var pushSubscription = new PushSubscription(details.Rows[0]["_endpoint"].ToString(), details.Rows[0]["p256dh"].ToString(), details.Rows[0]["auth"].ToString());
            var vapidDetails = new VapidDetails("mailto:example@example.com", _keys.PublicKey, _keys.PrivateKey);

            string payload = JsonConvert.SerializeObject(new { title, msg = message });
            var webPushClient = new WebPushClient();
            try
            {
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }


        }

    }
}
