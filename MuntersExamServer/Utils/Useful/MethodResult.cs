using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MuntersExamServer.Utils.Useful
{
    public class MethodResult
    {
        public readonly HttpStatusCode status;
        private readonly Exception exception = null;

        public MethodResult(HttpStatusCode status)
        {
            this.status = status;
        }

        public MethodResult(HttpStatusCode status, Exception ex = null)
        {
            this.status = status;
            this.exception = ex;
        }

        public bool Success()
        {
            return this.exception == null;
        }
    }

    public class MethodResult<T> : MethodResult
    {
        public readonly T model;

        public MethodResult(HttpStatusCode status) : base(status) { }

        public MethodResult(HttpStatusCode status, T model, Exception ex = null) : base(status, ex)
        {
            this.model = model;
        }
    }

}

