using System;
using System.Collections.Generic;
using System.Text;

namespace _BAL
{
    public class Room
    {
        public int RoomId { get; set; }
        public int RoomTypeId { get; set; }
        public string RoomTypeName { get; set; }
        public string RoomName { get; set; }
        public int FloorNumber { get; set; }
        public string RoomPicture { get; set; }
        public List<Fault> Faults { get; set; }

    }
}
