const env = process.env.NODE_ENV || "dev";
import dev from "./dev.json";
import production from "./production.json";
import test from "./test.json";

const configs = {
    dev,
    production,
    test
};
console.log("environement: " + env);
const config = configs[env];
export default config;