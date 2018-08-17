using System;
using System.Collections.Generic;
using System.Text;

namespace _BAL
{
    public class Fault
    {
        public User Owner { get; set; }
        public int faultID { get; set; }
        public string faultName { get; set; }
        public string info { get; set; }
        public bool faultStatus { get; set; }
        public DateTime openDate { get; set; }
        public DateTime closeDate { get; set; }
        public List<string> faultPictures { get; set; }
    }
}
