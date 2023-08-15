const { CorsairApi } = require("@lumiastream/corsair-cove");
const fs = require("fs");
const util = require("util");
const log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
const log_stdout = process.stdout;
// import { createRandomRgb } from '../src/utils';

// Log to a file
console.log = function (d) {
  log_file.write(JSON.stringify(d) + "\n");
  log_stdout.write(JSON.stringify(d) + "\n");
};
console.error = function (d) {
  log_file.write(JSON.stringify(d) + "\n");
  log_stdout.write(JSON.stringify(d) + "\n");
};

const corsair = new CorsairApi();

const start = async () => {
  try {
    const res = await corsair.setup();
    console.log("setup res", res);
    const devices = await corsair.getDeviceInfo();

    // setInterval(() => {
    const randRGB = createRandomRgb(0, 255);
    console.log("randRGB: ", randRGB);
    let brightness = createRandomRgb(0, 100)[0];
    console.log("brightness: ", brightness);

    const state = new LightState().rgb(randRGB).brightness(brightness);
    devices.map(async (device) => {
      await corsair.setDeviceState({
        devices: [{ type: CorsairDirectTypes.DEVICE, id: device.id }],
        state,
      });
    });
    // 	brightness -= 20;
    // }, 5000);
  } catch (err) {
    console.log("Error", err);
    console.log("\n\n\n");
  }
};

start();

process.on("SIGINT", async () => {
  if (corsair) {
    CorsairApi.stop();
  }

  process.exit(0);
});
