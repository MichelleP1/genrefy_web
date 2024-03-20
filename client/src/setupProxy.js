const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: "http://localhost:5000",
      // target: "https://genrefy-f638afe4a30c.herokuapp.com/",
    })
  );
};

// module.exports = function (app) {
//   app.use(
//     proxy("/auth/**", {
//       target: "http://localhost:5000",
//       // target: "https://genrefy-f638afe4a30c.herokuapp.com/",
//       headers: {
//         Connection: "keep-alive",
//       },
//     })
//   );
// };
