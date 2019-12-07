using MuntersExamServer.Models.Rooms.SignalRHub;
using MuntersExamServer.Models.Users.SignalRHub;

namespace MuntersExamServer.HubsAccess
{
    public class ChatHubListeners
    {

        internal const string section = "/ChatHubSection";
        
        internal readonly HubUsersListenets users = new HubUsersListenets();

        internal readonly HubRoomsListenets rooms = new HubRoomsListenets();

    }

}



