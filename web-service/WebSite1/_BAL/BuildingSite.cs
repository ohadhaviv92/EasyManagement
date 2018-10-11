using System;
using System.Collections.Generic;

namespace _BAL
{
    public class BuildingSite
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; }
        public string SiteAddress { get; set; }
        public bool SiteStatus { get; set; }
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
        public string SiteImage { get; set; }
        public int SumUserInSite { get; set; }
        public int SumFaultInSite { get; set; }
        public List<Room> Rooms { get; set; }
    }
}
