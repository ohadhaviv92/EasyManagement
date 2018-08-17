using System;
using System.Collections.Generic;
using System.Text;

namespace _BAL
{
    public class BuildingSite
    {
        public int siteID { get; set; }
        public string siteName { get; set; }
        public string siteAddress { get; set; }
        public bool siteStatus { get; set; }
        public int userTypeID { get; set; }
        public string userTypeName { get; set; }
        public List<Room> Rooms { get; set; }
    }
}
