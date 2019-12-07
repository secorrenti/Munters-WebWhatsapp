using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuntersExamServer.Utils.Interfaces
{

    interface ICallExecution<T, K>
    {
        T Execute(K model);
    }

}
