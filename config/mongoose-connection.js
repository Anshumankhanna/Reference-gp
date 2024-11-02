import { connect, connections } from "mongoose";
import config from "config";
import debug from "debug";

const dbgr = debug("development:mongoose");

connect(`${config.get("MONGODB_URI")}/grievance-portal`)
.then(() => {
    dbgr("connected");
})
.catch((err) => {
    dbgr(err);
});

export default connections;