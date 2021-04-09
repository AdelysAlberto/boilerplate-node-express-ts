import jwtDecode from 'jwt-decode';
import httpContext from 'express-http-context';

/**
 * Decode a jwt token.
 * @param {string} jwt token.
 * @returns {boolean}
 */
const decode = (token) => jwtDecode(token);

/**
 * Receive decode, and load the token.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const token2Context = (req, res, next) => {
  //Extract the token from the header.
  const authorization = req.get('Authorization');

  //IF the authorization header is not defined.
  if (!authorization) {
    next();
    return;
  }

  //Decode the token and extract the "sub" claim.
  const decodedJWT = decode(authorization);

  //Decoded token object.
  const { sub } = decodedJWT;

  //If the sub claim is defined, add in context and request.
  if (sub) {
    //Set in context.
    httpContext.set('user', decodedJWT);
    httpContext.set('client', sub);
    httpContext.set('token', authorization);

    //Modify request object.
    req.clientId = sub;
  }

  next();
};

export { decode, token2Context };
