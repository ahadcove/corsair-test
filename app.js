const { CorsairApi } = require('@lumiastream/corsair-cove');
// import { createRandomRgb } from '../src/utils';

const corsair = new CorsairApi();

const start = async () => {
	try {
		const res = await corsair.setup()
		console.log('setup res', res);
		console.log('\n\n\n');
		const devices = await corsair.getDeviceInfo();
		console.log('Devices', JSON.stringify(devices));

		setInterval(() => {
			console.log('wow');
			// const randRGB = createRandomRgb(0, 255);
			// console.log('randRGB: ', randRGB);
		// 	let brightness = createRandomRgb(0, 100)[0];
		// 	console.log('brightness: ', brightness);

		// 	const state = new LightState().rgb(randRGB).brightness(brightness);
		// 	devices.map(async (device) => {
		// 		await corsair.setDeviceState({ devices: [{ type: CorsairDirectTypes.DEVICE, id: device.id }], state });
		// 	});
		// 	brightness -= 20;
		}, 5000);
	} catch (err) {
		console.log('Lights err', err);
		console.log('\n\n\n');
	}
};

start();

process.on('SIGINT', async () => {
	if (corsair) {
		CorsairApi.stop();
	}

	process.exit(0);
});
