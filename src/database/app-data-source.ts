import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "5661369",
	database: "diploma",
	entities: ["dist/src/entity/*.js"], //out dir
	// logging: true,
	synchronize: true,
});