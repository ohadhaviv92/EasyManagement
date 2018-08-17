using System;
using System.Collections.Generic;
using System.Text;

namespace _BAL
{
    class Room
    {
        public int roomID { get; set; }
        public int roomTypeID { get; set; }
        public string roomName { get; set; }
        public int floorNumber { get; set; }

        public List<Fault> Faults { get; set; }

    }
}
