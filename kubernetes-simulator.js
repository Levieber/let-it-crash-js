import { spawn } from "node:child_process";
const INSTANCES = 3;

const prepareLog = (pid) => {
	return (message) => console.log(`[${pid}] - ${message}`);
};

function spinUpInstance() {
	const cp = spawn("node", ["app/server.js"]);
	const log = prepareLog(cp.pid);

	log("Instance starting...");

	// cp.stdout.on("data", (msg) => console.log(msg.toString().trim()));

	cp.on("exit", (code) => {
		log(`Exited with code: ${code}`);

		if (code === 0) {
			return;
		}

		spinUpInstance();
	});
}

for (let i = 0; i < INSTANCES; i++) {
	spinUpInstance();
}
