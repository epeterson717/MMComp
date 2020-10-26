Module.register("compliments", {
	// Module config defaults.
	defaults: {
		compliments: {
            anytime: ["Hey there sexy!", 
                "Hi Emily!",
                "I hope your day is as nice as your face!",
                "Have you been working out?",
                "I'm lucky to be your mirror!",
                "The Force is strong with you",
                "If I could high five you... I would!",
                "On a scale from 1 to 10, you're an 15!",
                "Being awesome is hard, but you'll manage",
                "I could just hang here all day!",
                "I need some time to reflect...",
                "I see a lot of myself in you",
                "Damn. You're looking good!",
                "You are the fairest of them all",
                "May the Force be with you",
                "Welcome to the desert of the real",
                "I carried a watermelon",
                "Your smile is contagious",
                "You look great today",
                "You're a smart cookie",
                "I like your style",
                "You have the best laugh",
                "I appreciate you",
                "You are the most perfect you there is",
                "You light up the room",
                "You deserve a hug right now",
                "You have a great sense of humor",
                "You've got all the right moves!",
                "You're like sunshine on a rainy day",
                "I bet you sweat glitter",
                "That color is perfect on you",
                "Hanging out with you is always a blast",
                "You smell really good",
                "Being around you makes everything better!",
                "Colors seem brighter when you're around",
                "Jokes are funnier when you tell them",
                "Your hair looks stunning",
                "You're one of a kind!",
                "You're inspiring",
                "You have the best ideas",
                "You could survive a Zombie apocalypse",
                "You're more fun than bubble wrap",
                "You're great at figuring stuff out",
                "Your voice is magnificent",
                "You're like a breath of fresh air",
                "You're irresistible when you blush",
                "You're someone's reason to smile",
                "You look great in that outfit",
                "I like the way you smile",
                "You're so funny!",
                "I like your sense of style",
                "Your hair looks amazing",
                "You smell good today",
                "You rock that shirt!",
                "Have been working out lately?",
                "How do you style your hair like that?",
                "I like your pants",
                "I will recommend your service to my friends",
                "You must be the life of the party",
                "You look even better without makeup",
                "You have a great taste",
                "Take a break! You deserve a vacation",
                "Keep up the good work!",
                "Those shoes were a great call. ",
                "9/10 dentists agree, you are the BEST",
                "Today's outfit = Thumbs up",
                "You'd be the last one standing in a horror movie",
                "You're funny. Like, LOL style",
                "You have very smooth hair",
                "You deserve a promotion",
                "I like your style",
                "That looks nice on you",
                "I like your socks",
                "Your smile is breath taking",
                "You make my data circuits skip a beat",
                "You are the gravy to my mashed potatoes",
                "I like your pants",
                "You could probably lead a rebellion",
                "Your skin is radiant",
                "You could survive a zombie apocalypse",
                "You're so rad",
                "You're nicer than a day on the beach",
                "Your glass is the fullest",
                "You look so perfect",
                "You're more fun than bubble wrap",
                "You're the bee's knees",
                "You definitely know the difference between your and you're",
                "Yum!, I dig you",
                "You got the moves like Jagger",
                "I'd volunteer for your place in the Hunger Games",
                "You're awesome",
                "You're the best",
                "You're fantastic",
                "You're really flipping smart",
                "You look awesome today, seriously"],
            morning: ["Good morning, pretty lady!", 
                "Enjoy your day!", 
                "How was your sleep?",
                "Good morning, sunshine!",
                "Who needs coffee when you have your smile?",
                "Go get 'em, Tiger!"],
            afternoon: ["Hello, beauty!", 
                "You look sexy!",
                "Hitting your stride!", 
                "Looking good today!"],
            evening: ["Wow, you look hot!", 
                "You look nice!", 
                "Hi, sexy!", 
                "You made someone smile today, I know it",
                "You are making a difference",
                "See you tomorrow!",
                "Sleep tight"],
			"....-01-01": ["Happy new year!"]
		},
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
		random: true,
		mockDate: null
	},
	lastIndexUsed: -1,
	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		var self = this;
		if (this.config.remoteFile !== null) {
			this.complimentFile(function (response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}

		// Schedule update timer.
		setInterval(function () {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function (compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function () {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function () {
		var hour = moment().hour();
		var date = this.config.mockDate ? this.config.mockDate : moment().format("YYYY-MM-DD");
		var compliments;

		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = this.config.compliments.morning.slice(0);
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else if (this.config.compliments.hasOwnProperty("evening")) {
			compliments = this.config.compliments.evening.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		for (var entry in this.config.compliments) {
			if (new RegExp(entry).test(date)) {
				compliments.push.apply(compliments, this.config.compliments[entry]);
			}
		}

		return compliments;
	},

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function (callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function () {
		// get the current time of day compliments list
		var compliments = this.complimentArray();
		// variable for index to next message to display
		let index = 0;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(compliments);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		return compliments[index] || "";
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the compliment text
		var complimentText = this.randomCompliment();
		// split it into parts on newline text
		var parts = complimentText.split("\n");
		// create a span to hold it all
		var compliment = document.createElement("span");
		// process all the parts of the compliment text
		for (var part of parts) {
			// create a text element for each part
			compliment.appendChild(document.createTextNode(part));
			// add a break `
			compliment.appendChild(document.createElement("BR"));
		}
		// remove the last break
		compliment.lastElementChild.remove();
		wrapper.appendChild(compliment);

		return wrapper;
	},

	// From data currentweather set weather type
	setCurrentWeatherType: function (data) {
		var weatherIconTable = {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "night_cloudy",
			"03n": "night_cloudy",
			"04n": "night_cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		};
		this.currentWeatherType = weatherIconTable[data.weather[0].icon];
	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification === "CURRENTWEATHER_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	}
});
