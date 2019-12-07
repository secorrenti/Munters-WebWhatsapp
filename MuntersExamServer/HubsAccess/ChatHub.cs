using BuyListServer.Models.Rooms.BusinessLogic;
using BuyListServer.Models.Users.BusinessLogic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using MuntersExamServer.Models.Users;
using System;
using System.Threading.Tasks;

namespace MuntersExamServer.HubsAccess
{

    [Authorize]

    public partial class ChatHub : Hub
    {
        private readonly UserAuth user;
        private readonly IUsersBL usersBL;
        private readonly IRoomsBL roomsBL;
        private readonly ChatHubListeners on = new ChatHubListeners();

        public ChatHub(
            IUsersBL usersBL,
            IRoomsBL roomsBL,
            IHttpContextAccessor accessor)
        {
            this.roomsBL = roomsBL;
            this.usersBL = usersBL;
            this.user = usersBL.GetAuthenticatedUser(accessor.HttpContext.User);
        }


        public override Task OnConnectedAsync()
        {
            usersBL.SaveUserConnection(user, Context.ConnectionId);
            Clients.Caller.SendAsync(on.users.ShareUserConnectionId, Context.ConnectionId);
            Clients.All.SendAsync(on.users.ShareUserConnections, usersBL.ShareUserConnections());
            Groups.AddToGroupAsync(Context.ConnectionId, RoomsBL.GeneralRoom);
            return base.OnConnectedAsync();
        }


        public override Task OnDisconnectedAsync(Exception exception)
        {
            usersBL.DeleteUserConnection(user.Nickname);
            Clients.All.SendAsync(on.users.ShareUserConnections, usersBL.ShareUserConnections());
            Clients.All.SendAsync(on.users.ShareDeletedUser, Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

    }

}


