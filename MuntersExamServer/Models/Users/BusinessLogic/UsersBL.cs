
using MuntersExamServer.Models.Users;
using MuntersExamServer.Utils.Useful;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;


namespace BuyListServer.Models.Users.BusinessLogic
{
    public class UsersBL : IUsersBL
    {
        private static List<UserAuth> connUsers = new List<UserAuth>();


        public UserAuth GetAuthenticatedUserFromEncryption(string Encryption)
        {
            var decryptionToken = (JObject)JsonConvert.DeserializeObject(Utilities.HardDecryption(Encryption));
            var user = new UserAuth(decryptionToken);
            return connUsers.First(row => row.Nickname == user.Nickname);
        }


        public UserAuth GetAuthenticatedUser(ClaimsPrincipal user)
        {
            var encryption = GetToken(user);

            if (!string.IsNullOrEmpty(encryption))
            {
                return GetAuthenticatedUserFromEncryption(encryption);
            }
            return null;
        }


        public string GetToken(ClaimsPrincipal user)
        {
            var data = user.FindFirst(ClaimTypes.UserData);
            return data?.Value;
        }


        public List<UserAuth> ShareUserConnections()
        {
            return connUsers;
        }


        public void SaveUserConnection(UserAuth userInfo, string connectionId)
        {
            var user = connUsers.FirstOrDefault(row => row.Nickname == userInfo.Nickname);
            user.ConnectionId = connectionId;
        }


        public void DeleteUserConnection(string nickname)
        {
            var user = connUsers.FirstOrDefault(row => row.Nickname == nickname);
            if(user != null)
            {
                connUsers.Remove(user);
            }
        }

        public bool NicknameTaken(string nickname)
        {
            return connUsers.FirstOrDefault(row => row.Nickname == nickname) != null;
        }

        public UserAuth Add(string Nickname, string Avatar)
        {
            var user = new UserAuth(Nickname, Avatar);
            connUsers.Add(user);
            return user;
        }
    }
}
