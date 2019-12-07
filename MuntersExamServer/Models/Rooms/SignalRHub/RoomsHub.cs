using BuyListServer.Models.Rooms.BusinessLogic;
using Microsoft.AspNetCore.SignalR;
using MuntersExamServer.Models.Rooms.DataTransferObjects;
using MuntersExamServer.Models.Rooms.SignalRHub;
using MuntersExamServer.Models.Users.DataTransferObjects;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.HubsAccess
{
    public partial class ChatHub : IRoomsHub
    {

        public async Task<ChatRoom> CheckRoom(string guestId)
        {
            var chatRoom = new ChatRoom(usersBL, roomsBL, user, guestId);
            await Groups.AddToGroupAsync(chatRoom.Owner.ConnectionId, chatRoom.Name);
            await Groups.AddToGroupAsync(chatRoom.Guest.ConnectionId, chatRoom.Name);
            await Clients.Client(chatRoom.Guest.ConnectionId).SendAsync(on.rooms.ShareRoomToUser, chatRoom);
            return chatRoom;
        }

        public async Task AddMessage(string groupName, RoomMessageDto message)
        {
            await this.Clients.Group(groupName).SendAsync(on.rooms.ShareRoomMessage, groupName, message);
        }

        public async Task AddMessageToGeneral(RoomMessageDto message)
        {
            await this.Clients.All.SendAsync(on.rooms.ShareGeneralMessage, message);
        }

        public async Task AllMessagesReaded(string groupName)
        {
            await this.Clients.Group(groupName).SendAsync(on.rooms.ShareGroupNameReaded, groupName);
        }


    }
 
}
