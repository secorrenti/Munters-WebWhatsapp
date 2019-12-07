using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.Models.Users.DataTransferObjects
{
    public class RoomMessageDto
    {
        public long Id { get; set; }

        public string Text { get; set; }

        public string Sender { get; set; }

        public bool IsReaded { get; set; }
    }
}
