
## Tech Stack


**Server:** Node Js , Express  , Mongoose , MongoDb

## Packages Used :

- [Bycrypt Js](https://www.npmjs.com/package/bcryptjs) to hash high secure data.
- [JSON web token](https://www.npmjs.com/package/jwt) to generate token for user access.
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser) to parse data from cookie.
- [Express-fileUpload](https://www.npmjs.com/package/express-fileupload) to upload files.
- [http-status-codes](https://www.npmjs.com/package/http-status-codes) to use status codes while throwing error.
- [validator](https://www.npmjs.com/package/validator) to validate email, name etc.
- [.env](https://www.npmjs.com/package/dotenv) to save the secure data.
- [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to  allow  server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
- [mongoose](https://mongoosejs.com/)  as an Object-Document-Mapper (ODM) to interact with MongoDB database.


### How to Run Locally  
- Fork this repository.
- Clone the repository.
```console
git clone git@github.com:<your github username>/github-error-solve.git
```
- Navigate to folder
```console
cd github-error-solve
```
- Install node dependencies
```console
npm i
```
- Start the project
```console
nodemon app.js
```