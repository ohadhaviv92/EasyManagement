using System;
using System.Collections.Generic;
using System.Text;

namespace _BAL
{
    class BuildingSite
    {
        public int siteID { get; set; }
        public string siteName { get; set; }
        public string siteAddress { get; set; }
        public bool siteStatus { get; set; }

        public List<Room> Rooms { get; set; }
    }
}
