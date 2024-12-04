import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ntc_bus_booking", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
