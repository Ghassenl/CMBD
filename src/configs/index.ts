import dotenv from "dotenv";

dotenv.config();

interface ConfigInterface {
  port: number;
}

/* istanbul ignore next */
const config: ConfigInterface = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

export default config;
