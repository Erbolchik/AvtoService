using System.Text;

namespace AvtoService.Models
{
    public class AuthOptions
    {
        public string Issuer { get; set; }
        public string SignInKey { get; set; }
        public string Audience { get; set; }
        public int Expires { get; set; }

        public byte[] GetSignInKeyBytes()
        {
            return Encoding.UTF8.GetBytes(SignInKey);
        }
    }
}
