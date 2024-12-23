import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Booking = sequelize.define("Booking", {
    bookingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NIC: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "schedule",
            key: "scheduleId",
        },
    },
    seatsBooked: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateBooked: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

export default Booking;
