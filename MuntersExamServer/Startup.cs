using System.Threading.Tasks;
using BuyListServer.Models.Rooms.BusinessLogic;
using BuyListServer.Models.Users.BusinessLogic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MuntersExamServer.HubsAccess;
using MuntersExamServer.Utils.Useful;
using Newtonsoft.Json;

namespace MuntersExamServer
{
    public class Startup
    {
 
 
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            if (!string.IsNullOrEmpty(accessToken))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Secret.jwtKey),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddSingleton<IUsersBL, UsersBL>();
            services.AddSingleton<IRoomsBL, RoomsBL>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            
            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors("CorsPolicy");
            }

            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>(ChatHubListeners.section);
            });
            app.UseMvc();
        }

    }
}
