using _DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using WebPush;

namespace _BAL
{
    public sealed class BAL
    {
        static VapidDetails Keys = null;

        private static BAL instance = null;
        private static readonly object padlock = new object();

        public static BAL Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                        instance = new BAL();
                    return instance;
                }
            }
        }

        private BAL()
        {
            Keys = VapidHelper.GenerateVapidKeys();
        }

        public string GetKey()
        {
            if (Keys == null)
            {
                Keys = VapidHelper.GenerateVapidKeys();
            }
            return Keys.PublicKey;
        }

        public UserInSites Login(string userName, string password)
        {
            UserInSites UserWithSites = new UserInSites();

            DataTable results = DAL.Login(userName, password);
            if (results == null)
                return null;
            User _user = new User
            {
                userID = int.Parse(results.Rows[0]["userID"].ToString()),
                userName = results.Rows[0]["userName"].ToString(),
                pass = results.Rows[0]["pass"].ToString(),
                firstName = results.Rows[0]["firstName"].ToString(),
                lastName = results.Rows[0]["lastName"].ToString(),
                email = results.Rows[0]["email"].ToString(),
                tel = results.Rows[0]["tel"].ToString()
            };

            UserWithSites.User = _user;

            results = DAL.GetUserSites(_user.userID);
            if (results == null)
                return UserWithSites;

            List<BuildingSite> Sites = new List<BuildingSite>();
            for (int i = 0; i < results.Rows.Count; i++)
            {

                BuildingSite _site = new BuildingSite
                {
                    siteID = int.Parse(results.Rows[i]["siteID"].ToString()),
                    siteName = results.Rows[i]["siteName"].ToString(),
                    siteAddress = results.Rows[i]["siteAddress"].ToString(),
                    siteStatus = bool.Parse(results.Rows[i]["siteStatus"].ToString()),
                    userTypeID = int.Parse(results.Rows[i]["userTypeID"].ToString()),
                    userTypeName = results.Rows[i]["userTypName"].ToString()
                };

                List<Room> rooms = new List<Room>();
                DataTable roomsResults = DAL.GetAllRoomsInSite(_site.siteID);
                if (roomsResults != null)
                {
                    for (int j = 0; j < roomsResults.Rows.Count; j++)
                    {
                        Room room = new Room
                        {
                            roomID = int.Parse(roomsResults.Rows[j]["roomID"].ToString()),
                            roomName = roomsResults.Rows[j]["roomName"].ToString(),
                            floorNumber = int.Parse(roomsResults.Rows[j]["floorNumber"].ToString()),
                            roomTypeID = int.Parse(roomsResults.Rows[j]["roomTypeID"].ToString()),
                            roomTypeName = roomsResults.Rows[j]["roomTypeName"].ToString(),
                            roomPicture = roomsResults.Rows[j]["roomPicture"].ToString()
                        };
                        List<Fault> faults = new List<Fault>();
                        DataTable faultsResults = DAL.GetAllFaultsInRoom(room.roomID);
                        if (faultsResults != null)
                        {
                            for (int k = 0; k < faultsResults.Rows.Count; k++)
                            {
                                Fault fault = new Fault
                                {
                                    Owner = new User
                                    {
                                        userID = int.Parse(faultsResults.Rows[k]["ownerID"].ToString())
                                    },
                                    Worker = new User
                                    {
                                        userID = int.Parse(faultsResults.Rows[k]["workerID"].ToString())
                                    },
                                    faultID = int.Parse(faultsResults.Rows[k]["faultID"].ToString()),
                                    faultTypeID = int.Parse(faultsResults.Rows[k]["faultType"].ToString()),
                                    faultName = faultsResults.Rows[k]["faultName"].ToString(),
                                    faultStatus = bool.Parse(faultsResults.Rows[k]["faultStatus"].ToString()),
                                    info = faultsResults.Rows[k]["info"].ToString(),
                                    openDate = DateTime.Parse(faultsResults.Rows[k]["openDate"].ToString()),
                                };
                                if (faultsResults.Rows[k]["closeDate"].ToString() != "")
                                    fault.closeDate = DateTime.Parse(faultsResults.Rows[k]["closeDate"].ToString());

                                DataTable OwnerReuslts = DAL.GetUserInSite(fault.Owner.userID , _site.siteID);
                                if (OwnerReuslts != null)
                                {
                                    fault.Owner.JobID = int.Parse(OwnerReuslts.Rows[0]["userTypeID"].ToString());
                                    fault.Owner.JobName = OwnerReuslts.Rows[0]["userTypName"].ToString();
                                    fault.Owner.userName = OwnerReuslts.Rows[0]["userName"].ToString();
                                    fault.Owner.firstName = OwnerReuslts.Rows[0]["firstName"].ToString();
                                    fault.Owner.lastName = OwnerReuslts.Rows[0]["lastName"].ToString();
                                    fault.Owner.email = OwnerReuslts.Rows[0]["email"].ToString();
                                    fault.Owner.tel = OwnerReuslts.Rows[0]["tel"].ToString();
                                    fault.Owner.img = OwnerReuslts.Rows[0]["img"].ToString();
                                }

                                DataTable WorkerReuslts = DAL.GetUserInSite(fault.Worker.userID, _site.siteID);
                                if (WorkerReuslts != null)
                                {
                                    fault.Worker.JobID = int.Parse(WorkerReuslts.Rows[0]["userTypeID"].ToString());
                                    fault.Worker.JobName = WorkerReuslts.Rows[0]["userTypName"].ToString();
                                    fault.Worker.userName = WorkerReuslts.Rows[0]["userName"].ToString();
                                    fault.Worker.firstName = WorkerReuslts.Rows[0]["firstName"].ToString();
                                    fault.Worker.lastName = WorkerReuslts.Rows[0]["lastName"].ToString();
                                    fault.Worker.email = WorkerReuslts.Rows[0]["email"].ToString();
                                    fault.Worker.tel = WorkerReuslts.Rows[0]["tel"].ToString();
                                    fault.Worker.img = WorkerReuslts.Rows[0]["img"].ToString();
                                }


                                faults.Add(fault);
                            }
                        }
                        room.Faults = faults;
                        rooms.Add(room);
                    }
                }
                _site.Rooms = rooms;

                Sites.Add(_site);
            }
            UserWithSites.Sites = Sites;

            return UserWithSites;
        }

        public object Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
            DataTable results = DAL.Register(userName, pass, firstName, lastName, email, tel);
            if (results == null)
                return null;

            if (results.Columns.Count > 1)
            {
                User _user = new User
                {
                    userID = int.Parse(results.Rows[0]["userID"].ToString()),
                    userName = results.Rows[0]["userName"].ToString(),
                    pass = results.Rows[0]["pass"].ToString(),
                    firstName = results.Rows[0]["firstName"].ToString(),
                    lastName = results.Rows[0]["lastName"].ToString(),
                    email = results.Rows[0]["email"].ToString(),
                    tel = results.Rows[0]["tel"].ToString()
                };

                return _user;
            }
            var error = new { Error = results.Rows[0][0].ToString() };
            return error;

        }

        public void AddNotification(string email, Token token)
        {
            DAL.UpdateNotificationKey(email, token.endpoint, token.p256dh, token.auth);

            Notify(email, "test", "test of this notification");
        }

        private void Notify(string email, string title, string message)
        {

            DataTable details = DAL.GetNotificationKeys(email);
            if (details == null)
                return;


            var pushSubscription = new PushSubscription(details.Rows[0]["_endpoint"].ToString(), details.Rows[0]["p256dh"].ToString(), details.Rows[0]["auth"].ToString());
            var vapidDetails = new VapidDetails("mailto:example@example.com", Keys.PublicKey, Keys.PrivateKey);

            string payload = JsonConvert.SerializeObject(new { title = title, msg = message });
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
