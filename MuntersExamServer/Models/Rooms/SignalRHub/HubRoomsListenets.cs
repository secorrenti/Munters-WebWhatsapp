using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.Models.Rooms.SignalRHub
{
    public class HubRoomsListenets
    {
        internal readonly string ShareRoomMessage = "ShareRoomMessage";

        internal readonly string ShareRoomToUser = "ShareRoomToUser";

        internal readonly string ShareGroupNameReaded = "ShareGroupNameReaded";

        internal readonly string ShareGeneralMessage = "ShareGeneralMessage";
    }
}
