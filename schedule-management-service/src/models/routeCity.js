import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RouteCity = sequelize.define(
    'RouteCity',
    {
        routeCityId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        routeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'route',
                key: 'routeId',
            },
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'city',
                key: 'cityId',
            },
        },
        sequenceOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'route_city',
        timestamps: false,
    }
);

export default RouteCity;
