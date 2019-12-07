using MuntersExamServer.Models.Rooms.DataTransferObjects;
using MuntersExamServer.Models.Users.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.Models.Rooms.SignalRHub
{
    public interface IRoomsHub
    {
        Task<ChatRoom> CheckRoom(string guestId);

        Task AddMessage(string groupName, RoomMessageDto message);

        Task AllMessagesReaded(string groupName);

    }
}
