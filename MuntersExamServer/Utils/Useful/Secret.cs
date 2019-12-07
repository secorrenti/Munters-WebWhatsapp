using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuntersExamServer.Utils.Useful
{
    public class Secret
    {
        public const string hash = "SomeHardHashKeyForMuntersExam_____764&^%&%$*&%4*&%4875$";
        public static readonly byte[] jwtKey = Encoding.ASCII.GetBytes("SomeHardJwtKeyForMuntersExam___R87^RO8tyIhbIt*^^8TY1");

    }
}
