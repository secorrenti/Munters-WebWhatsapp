using MuntersExamServer.Models.Users;
using MuntersExamServer.Models.Users.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BuyListServer.Models.Rooms.BusinessLogic
{
    public interface IRoomsBL
    {
        string GetNameFromConnections(string owner, string guest);

        string[] GetConnectionsFromName(string name);

    }
}
