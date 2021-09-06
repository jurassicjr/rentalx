import { hash } from "bcryptjs";
import { v4 } from "uuid";

import createConnection from "../index";

const create = async () => {
  const connection = await createConnection("localhost");
  const id = v4();

  const password = await hash("admin", 12);

  connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, created_at, drive_license) values ('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')`
  );

  await connection.close();
};

create().then(() => {
  console.log("User admin created");
});
