const tencentcloud = require("tencentcloud-sdk-nodejs");

const CdnClient = tencentcloud.cdn.v20180606.Client;

const cdnClient = new CdnClient({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
});

cdnClient
  .PurgePathCache({
    Paths: ["https://i.jakeyu.top/"],
    FlushType: "delete",
  })
  .then((res) => {
    console.log("刷新cdn缓存", res.TaskId, res.RequestId);
  });
