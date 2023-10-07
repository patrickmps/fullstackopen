const config = require('./utils/config');
const { info } = require('./utils/logger');
const app = require('./app');

const { PORT } = config;
app.listen(PORT, () => {
  info(`Server running on port ${config.PORT}`);
});
