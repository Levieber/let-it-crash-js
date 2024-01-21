const UNKNOWN_ERROR = 1;
const knownErrors = [
	{ exitCode: UNKNOWN_ERROR, event: "uncaughtException" },
	{ exitCode: UNKNOWN_ERROR, event: "unhandledRejection" },
];

const log = (message) => console.log(`[${process.pid}] - ${message}`);

process.on("exit", (code) => {
	log("Server closed with success");
	log("Database connection closed with success");
	process.exit(code);
});

for (const { exitCode, event } of knownErrors) {
	process.on(event, (_error) => {
		log(`Process exiting due to ${event}`);

		if (exitCode === UNKNOWN_ERROR) {
			// process.abort();
			process.exit(exitCode);
			return;
		}

		process.exit(exitCode);
	});
}

log("Process started");

let counter = 0;

const connectDatabase = () => {
	const randomNumber = Math.random();

	// throw new Error("Oh no!")

	if (randomNumber < 0.5) {
		return Promise.reject("Could not connect to database");
	}

	log("Connected to database");

	if (++counter > 3) {
		process.exit(0);
	}
};

setInterval(() => connectDatabase(), 200);
