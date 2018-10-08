using System;
using System.Collections.Generic;

namespace _BAL
{
    public class Fault
    {
        public User Owner { get; set; }
        public User Worker { get; set; }
        public int FaultId { get; set; }
        public int FaultTypeId { get; set; }
        public string FaultName { get; set; }
        public string Info { get; set; }
        public bool FaultStatus { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime CloseDate { get; set; }
        public List<string> FaultPictures { get; set; }
    }
}
