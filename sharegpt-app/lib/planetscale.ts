import { connect } from "@planetscale/database";

export const pscale_config = {
  host: "us-east.connect.psdb.cloud",
  username: process.env.PSCALE_USERNAME,
  password: process.env.PSCALE_PASSWORD,
};

export const conn = connect(pscale_config);
