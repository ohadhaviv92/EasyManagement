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

            results = Dal.GetUserSites(user.UserId);
            if (results == null)
                return userWithSites;

            var sites = new List<BuildingSite>();
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

                var rooms = new List<Room>();
                var roomsResults = Dal.GetAllRoomsInSite(site.SiteId);
                if (roomsResults != null)
                {
                    for (var j = 0; j < roomsResults.Rows.Count; j++)
                    {
                        var room = new Room
                        {
                            RoomId = int.Parse(roomsResults.Rows[j]["roomID"].ToString()),
                            RoomName = roomsResults.Rows[j]["roomName"].ToString(),
                            FloorNumber = int.Parse(roomsResults.Rows[j]["floorNumber"].ToString()),
                            RoomTypeId = int.Parse(roomsResults.Rows[j]["roomTypeID"].ToString()),
                            RoomTypeName = roomsResults.Rows[j]["roomTypeName"].ToString(),
                            RoomPicture = roomsResults.Rows[j]["roomPicture"].ToString()
                        };
                        var faults = new List<Fault>();
                        var faultsResults = Dal.GetAllFaultsInRoom(room.RoomId);
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

                                DataTable ownerReuslts = Dal.GetUserInSite(fault.Owner.UserId , site.SiteId);
                                if (ownerReuslts != null)
                                {
                                    fault.Owner.JobId = int.Parse(ownerReuslts.Rows[0]["userTypeID"].ToString());
                                    fault.Owner.JobName = ownerReuslts.Rows[0]["userTypName"].ToString();
                                    fault.Owner.UserName = ownerReuslts.Rows[0]["userName"].ToString();
                                    fault.Owner.FirstName = ownerReuslts.Rows[0]["firstName"].ToString();
                                    fault.Owner.LastName = ownerReuslts.Rows[0]["lastName"].ToString();
                                    fault.Owner.Email = ownerReuslts.Rows[0]["email"].ToString();
                                    fault.Owner.Tel = ownerReuslts.Rows[0]["tel"].ToString();
                                    fault.Owner.Img = ownerReuslts.Rows[0]["img"].ToString();
                                }

                                DataTable workerReuslts = Dal.GetUserInSite(fault.Worker.UserId, site.SiteId);
                                if (workerReuslts != null)
                                {
                                    fault.Worker.JobId = int.Parse(workerReuslts.Rows[0]["userTypeID"].ToString());
                                    fault.Worker.JobName = workerReuslts.Rows[0]["userTypName"].ToString();
                                    fault.Worker.UserName = workerReuslts.Rows[0]["userName"].ToString();
                                    fault.Worker.FirstName = workerReuslts.Rows[0]["firstName"].ToString();
                                    fault.Worker.LastName = workerReuslts.Rows[0]["lastName"].ToString();
                                    fault.Worker.Email = workerReuslts.Rows[0]["email"].ToString();
                                    fault.Worker.Tel = workerReuslts.Rows[0]["tel"].ToString();
                                    fault.Worker.Img = workerReuslts.Rows[0]["img"].ToString();
                                }


                                faults.Add(fault);
                            }
                        }
                        room.Faults = faults;
                        rooms.Add(room);
                    }
                }
                site.Rooms = rooms;

                sites.Add(site);
            }
            userWithSites.Sites = sites;

            return userWithSites;
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

            string payload = JsonConvert.SerializeObject(new {title, msg = message });
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
