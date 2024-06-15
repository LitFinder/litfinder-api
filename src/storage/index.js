import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: "auth.json",
});

const bucket = storage.bucket(process.env.BUCKETNAME);

export default bucket;
