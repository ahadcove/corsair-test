const { CorsairApi, LightState, CorsairDirectTypes } = require("@lumiastream/corsair-cove");
const fs = require("fs");
const log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
const log_stdout = process.stdout;

// Log to a file
console.log = function (...d) {
  log_file.write(JSON.stringify(d) + "\n");
  log_stdout.write(JSON.stringify(d) + "\n");
};
console.error = function (...d) {
  log_file.write(JSON.stringify(d) + "\n");
  log_stdout.write(JSON.stringify(d) + "\n");
};

const corsair = new CorsairApi();

const start = async () => {
  try {
	  console.log("Starting");
    const res = await corsair.setup();
    console.log("setup res", res);
    const devices = await corsair.getDeviceInfo();
    console.log("Devices received");

    // setInterval(() => {
	const randRGB = { r: 255, g: 0, b: 0};
    const brightness = 100;
    // const randRGB = createRandomRgb(0, 255);
    // console.log("randRGB: ", randRGB);
    // let brightness = createRandomRgb(0, 100)[0];
    // console.log("brightness: ", brightness);

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
    console.info("Error", err);
    console.error("Error", err);
  }
};

start();

process.on("SIGINT", async () => {
  if (corsair) {
    CorsairApi.stop();
  }

  process.exit(0);
});
