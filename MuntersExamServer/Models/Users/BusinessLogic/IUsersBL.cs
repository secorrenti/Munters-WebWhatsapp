using MuntersExamServer.Models.Users;
using MuntersExamServer.Models.Users.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BuyListServer.Models.Users.BusinessLogic
{
    public interface IUsersBL
    {

        UserAuth GetAuthenticatedUser(ClaimsPrincipal user);

        bool NicknameTaken(string nickname);

        List<UserAuth> ShareUserConnections();

        UserAuth Add(string Nickname, string Avatar);

        void SaveUserConnection(UserAuth userInfo, string connectionId);

        void DeleteUserConnection(string connectionId);

    }
}
