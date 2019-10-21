const  { env } = process;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const basicAuthModule = require('basic-auth');

const  basicAuth = () => {
  return (req, res, next) => {
    const user = basicAuthModule(req);
    if (!user || user.name !== env.DOCS_USER || user.pass !== env.DOCS_PASSWORD) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    } else {
      next();
    }
  };
};

// Documentation
module.exports = (router) => {
  const docTitle = env.DOCS_TITLE;
  const docVersion = env.DOCS_VERSION;

  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: docTitle,
        version: docVersion,
      },
    },
    apis: [
      './src/controllers/*.js',
    ],
  });

  const showExplorer = false;
  const options = {};
  const customCss = '';
  const customFavicon = '';
  const swaggerUrl = '';

  router.use(
    '/',
    basicAuth(),
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerSpec,
      showExplorer,
      options,
      customCss,
      customFavicon,
      swaggerUrl,
      docTitle,
      (req, res, next) => {
        next();
      }
    )
  );
};