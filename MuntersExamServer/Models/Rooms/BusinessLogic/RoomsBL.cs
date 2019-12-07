
using MuntersExamServer.Models.Users;
using System;
using System.Collections.Generic;


namespace BuyListServer.Models.Rooms.BusinessLogic
{
    public class RoomsBL : IRoomsBL
    {
        public static readonly string GeneralRoom = "GENERALROOM";

        private static readonly string separator = "___SEPARATOR___"; 

        private static readonly List<UserAuth> connUsers = new List<UserAuth>();


        public string[] GetConnectionsFromName(string name)
        {
            return name.Split(separator);
        }

        public string GetNameFromConnections(string owner, string guest)
        {
            var ids = new string[] { owner, guest };
            Array.Sort(ids);
            return ids[0] + separator + ids[1];
        }
    }
}
