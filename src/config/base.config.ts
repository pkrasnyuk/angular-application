export default class BaseConfig {

    private static configuration: any = require("../config_files/app.configuration.json");

    static get apiUrl() {
        let value = "http://localhost:1200/api";
        if (BaseConfig.configuration && BaseConfig.configuration.common && BaseConfig.configuration.common.api) {
            value = BaseConfig.configuration.common.api;
        }
        return value;
    }
}