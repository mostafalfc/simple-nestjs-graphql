export default () => ({
  debug: process.env.DEBUG,
  database: {
    uri: process.env.MONGO_URI,
  },
});
