module.exports = {
  client: {
    name: "LocalApollo",
    service: {
      name: "localApollo",
      //localSchemaFile: "../server/src/generated/schema.graphql",
      url: "http://localhost:4000",
      includes: ["src/**/*.{tsx,ts,jsx,js}"],
    },
  },
};
