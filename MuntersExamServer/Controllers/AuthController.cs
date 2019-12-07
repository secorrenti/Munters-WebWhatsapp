using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using BuyListServer.Models.Users.BusinessLogic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MuntersExamServer.Models.Users.DataTransferObjects;
using MuntersExamServer.Utils.Useful;

namespace MuntersExamServer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IUsersBL userBL;

        public AuthController(IUsersBL userBL)
        {
            this.userBL = userBL;
        }
        

        [HttpPost]
        public IActionResult Login([FromBody]UserLoginDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var info = model.Execute(userBL);

            if (info.status != HttpStatusCode.OK)
                return StatusCode((int)info.status);


            var auth = info.model;
            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, auth.Nickname),
                new Claim(ClaimTypes.UserData, Utilities.HardEncryption(auth.ToString())),
            };


            var key = new SymmetricSecurityKey(Secret.jwtKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddDays(1),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = creds,
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryption = tokenHandler.WriteToken(token);
            return Ok(new { encryption });

        }
    }
}