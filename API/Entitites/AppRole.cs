using Microsoft.AspNetCore.Identity;

namespace API.Entitites
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}