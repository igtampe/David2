using Igtampe.Actions.Exceptions;
using Igtampe.Controllers;
using Igtampe.Controllers.ExceptionHandling;
using Igtampe.Controllers.Exceptions;
using Igtampe.David2.Actions.Exceptions;

namespace Igtampe.Toffee.Backend.ExceptionHandling {

    /// <summary>Default implementation of the ExceptionHandlingMiddleware with all common redistributable exceptions</summary>
    public class DavidExceptionHandlingMiddleware : ExceptionHandlingMiddleware {

        /// <summary>Creates a handling middleware</summary>
        /// <param name="next"></param>
        public DavidExceptionHandlingMiddleware(RequestDelegate next) : base(next) { }

        /// <summary>Processes an exception and turns it into an ErrorResult for the EcxeptionHandling Middleware</summary>
        /// <param name="error"></param>
        /// <returns></returns>
        protected override ErrorResult ExceptionToErrorResult(Exception error)
            => error switch {
                FileTooLargeException or
                UnacceptableMimeTypeException or
                UsernameAlreadyExistsException
                    => ErrorResult.BadRequest(error.Message),

//                NotTaskAssigneeException or
//                NotTaskAssignerException or
//                CategoryNotOwnedException
//                    => ErrorResult.Forbidden(error.Message),

                ArtistNotFoundException or
                CharacterNotFoundException or
                CommissionNotFoundException or
                TagNotFoundException
                    => ErrorResult.NotFound(error.Message),

//                CategoryException or
//                TaskException
//                    => ErrorResult.ServerError(error.Message),

                _
                    => base.ExceptionToErrorResult(error),
            };

    }
}