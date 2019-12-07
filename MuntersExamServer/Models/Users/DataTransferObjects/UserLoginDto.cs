using BuyListServer.Models.Users.BusinessLogic;
using MuntersExamServer.Utils.Interfaces;
using MuntersExamServer.Utils.Useful;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MuntersExamServer.Models.Users.DataTransferObjects
{
    public class UserLoginDto : ICallExecution<MethodResult<UserAuth>, IUsersBL>
    {
        
        [Required]
        public string Nickname { get; set; }

        [Required]
        public string Avatar { get; set; }


        public MethodResult<UserAuth> Execute(IUsersBL userBL)
        {
            try
            {
                var taken = userBL.NicknameTaken(Nickname);
                if(taken)
                {
                    return new MethodResult<UserAuth>(HttpStatusCode.Forbidden);
                }
                return new MethodResult<UserAuth>(HttpStatusCode.OK, userBL.Add(Nickname, Avatar));
            }
            catch (Exception)
            {
                // Mail or Log Handler....
                return new MethodResult <UserAuth>(HttpStatusCode.InternalServerError);
            }
        }
    }
}
