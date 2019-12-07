using MuntersExamServer.Models.Users.SignalRHub;

namespace MuntersExamServer.HubsAccess
{
    public partial class ChatHub : IUsersHub
    {

        public object GetConnections()
        {
            return new { this.user, users = usersBL.ShareUserConnections() };
        }
        
    }

}
