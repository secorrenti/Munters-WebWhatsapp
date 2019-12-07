using MuntersExamServer.Utils.Useful;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.Models.Users
{
    public class UserAuth
    {

        public string Avatar { get; set; }

        public string Nickname { get; set; }

        public string ConnectionId { get; set; }
        
        public UserAuth()
        {

        }

        public UserAuth(JObject user)
        {
            this.Nickname = (string)user.GetValue("Nickname");
            this.Avatar = (string)user.GetValue("Avatar");
        }


        public UserAuth(string nickname, string avatar)
        {
            this.Nickname = nickname;
            this.Avatar = avatar;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
