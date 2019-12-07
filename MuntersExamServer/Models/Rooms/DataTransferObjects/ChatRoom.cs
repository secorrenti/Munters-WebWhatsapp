using BuyListServer.Models.Rooms.BusinessLogic;
using BuyListServer.Models.Users.BusinessLogic;
using MuntersExamServer.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.Models.Rooms.DataTransferObjects
{
    public class ChatRoom
    {
        public string Name { get; set; }

        public UserAuth Owner { get; set; }

        public UserAuth Guest { get; set; }

        public ChatRoom(IUsersBL usersBL, IRoomsBL roomsBL, UserAuth user, string guestId)
        {
            Owner = usersBL.ShareUserConnections().FirstOrDefault(row => row.Nickname == user.Nickname);
            Guest = usersBL.ShareUserConnections().FirstOrDefault(row => row.ConnectionId == guestId);
            Name = roomsBL.GetNameFromConnections(Owner.ConnectionId, Guest.ConnectionId);
        }

    }
}
