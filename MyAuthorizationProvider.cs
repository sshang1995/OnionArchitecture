using Data;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace OnionWebAPI
{
    public class MyAuthorizationProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            AzuredbEntities db = new AzuredbEntities();
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            var loginuser = db.Users.Where(x => (x.Name == context.UserName && x.Password == context.Password)).FirstOrDefault();
            if (loginuser != null)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
                identity.AddClaim(new Claim("username", "user"));
                identity.AddClaim(new Claim(ClaimTypes.Name, "user"));
                context.Validated(identity);

            }
            else
            {
                context.SetError("invalid grant", "Username and password is incorrect");
                return;
            }


        }
    }
}