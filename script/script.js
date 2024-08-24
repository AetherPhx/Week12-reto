// Variables Globales
const viewsList = [];
const usersList = [
	{ dni: "1", pin: "1", name: "Mali", balance: 200.0 },
	{ dni: "10247439", pin: "5678", name: "Gera", balance: 150.0 },
	{ dni: "98005362", pin: "9102", name: "Sabi", balance: 60.0 },
];
const user = { dni: "", pin: "", name: "", balance: 0.0 };

// Funciones
// Load Resources
const loadViews = () => {
	const views = document.getElementsByClassName("atm-app__view");
	for (let i = 0; i < views.length; i++) {
		let viewName = views[i].id.replace("view-", "");
		viewName = viewName.charAt(0).toUpperCase() + viewName.slice(1);
		viewsList.push({
			id: views[i].id,
			state: i === 0 ? true : false,
			name: viewName,
			element: views[i],
		});
	}
	console.groupCollapsed(`Se han cargado las vistas`);
	console.table(viewsList);
	console.groupEnd();
	printView();
};
const loadListeners = () => {
	viewsList.forEach((view) => {
		switch (view.name) {
			case `Start`:
				view.element.addEventListener("click", (e) => {
					if (e.target.className === "start__btn") {
						console.clear();
						changeView("Auth");
					}
				});
				break;

			case `Auth`:
				const authForm = document.querySelector(".auth__form");
				view.element.addEventListener("click", (e) => {
					listenLogOut(e, view.name);
				});
				view.element.addEventListener("submit", (e) => {
					e.preventDefault();
					validateAuth()
						? changeView("Menu")
						: console.error("Credenciales incorrectas");
				});
				break;

			case `Menu`:
				view.element.addEventListener("click", (e) => {
					listenLogOut(e, view.name);

					e.target.id === "operation-balance"
						? changeView("Balance")
						: e.target.id === "operation-deposit"
						? changeView("Deposit")
						: e.target.id === "operation-withdraw"
						? changeView("Withdraw")
						: null;
				});
				break;

			case `Balance`:
				view.element.addEventListener("click", (e) => {
					listenLogOut(e, view.name);
					listenBack(e, view.name);
				});
				break;

			case `Deposit`:
				view.element.addEventListener("click", (e) => {
					listenLogOut(e, view.name);
					listenBack(e, view.name);
				});
				view.element.addEventListener("submit", (e) => {
					e.preventDefault();
					const amount = parseFloat(
						document.querySelector("#deposit-amount").value
					);
					if (validateAdd(amount)) {
						console.log(`Depositando S/.${amount}...`);
						addToBalance(amount);
						printDepositResult(view.element, amount);
					} else printDepositResult(view.element, null);
				});
				break;

			case `Withdraw`:
				view.element.addEventListener("click", (e) => {
					listenLogOut(e, view.name);
					listenBack(e, view.name);
					let amount;

					switch (e.target.id) {
						case "withdraw-20":
							amount = 20;
							if (validateSubstract(amount)) {
								console.log(`Retirando S/.${amount}...`);
								substractFromBalance(amount);
								printWithdrawResult(view.element, amount);
							} else printWithdrawResult(view.element, null);
							break;
						case "withdraw-50":
							amount = 50;
							if (validateSubstract(amount)) {
								console.log(`Retirando S/.${amount}...`);
								substractFromBalance(amount);
								printWithdrawResult(view.element, amount);
							} else printWithdrawResult(view.element, null);
							break;
						case "withdraw-100":
							amount = 100;
							if (validateSubstract(amount)) {
								console.log(`Retirando S/.${amount}...`);
								substractFromBalance(amount);
								printWithdrawResult(view.element, amount);
							} else printWithdrawResult(view.element, null);
							break;
						case "withdraw-150":
							amount = 150;
							if (validateSubstract(amount)) {
								console.log(`Retirando S/.${amount}...`);
								substractFromBalance(amount);
								printWithdrawResult(view.element, amount);
							} else printWithdrawResult(view.element, null);
							break;
						default:
							break;
					}
				});
				view.element.addEventListener("submit", (e) => {
					e.preventDefault();
					const amount = parseFloat(
						document.querySelector("#withdraw-amount").value
					);
					if (validateSubstract(amount)) {
						console.log(`Retirando S/.${amount}...`);
						substractFromBalance(amount);
						printWithdrawResult(view.element, amount);
					} else printWithdrawResult(view.element, null);
				});
				break;

			default: // Para vistas sin Listeners
				console.error(
					`La vista "${view.name}" no tiene configurado un listener.`
				);
				break;
		}
	});
};

// Validations
const validateAuth = () => {
	const auth = {
		dni: document.querySelector("#auth-dni").value,
		pin: document.querySelector("#auth-pin").value,
	};
	const selectedUser = usersList.find(
		(user) => user.dni === auth.dni && user.pin === auth.pin
	);

	if (!selectedUser) {
		document.querySelector(".auth-error").style.display = "block";
		document.querySelector(".auth__form").reset();
		return false;
	} else {
		Object.assign(user, selectedUser);
		console.log(`¡El usuario es válido!
		DNI: ${user.dni}
		PIN: ${user.pin}
		Nombre: ${user.name}
		Saldo: ${user.balance}
		`);
		return true;
	}
};
const validateAdd = (amount) => amount > 0;
const validateSubstract = (amount) => amount > 0 && amount <= user.balance;

// Navigation
const changeView = (viewName) => {
	const newView = viewsList.find((view) => view.name === viewName);
	if (!newView) console.error("No se ha encontrado la vista.");
	else if (newView.state) console.error("La vista ya se está mostrando.");
	else {
		previousView = viewsList.find((view) => view.state === true);
		previousView.state = false;
		newView.state = true;

		resetViewData(previousView);
		resetViewData(newView);
		if (newView.name === "Balance") printBalance();
		printView();
	}
};
const resetViewData = (view) => {
	switch (view.name) {
		case "Menu":
			const greetingsElement = document.querySelector(".menu__welcome");
			greetingsElement.textContent = `Bienvenido, ${user.name}!`;
		case "Auth":
			document.querySelector(".auth__form").reset();
			document.querySelector(".auth-error").style.display = "none";
			break;
		case "Deposit":
			document.querySelector("#deposit-amount").value = "";
			document.querySelector(".deposit-result__fail").style.display = "none";
			document.querySelector(".deposit-result__success").style.display = "none";
			break;
		case "Withdraw":
			document.querySelector("#withdraw-amount").value = "";
			document.querySelector(".withdraw-result__error").style.display = "none";
			document.querySelector(".withdraw-result__success").style.display =
				"none";
			break;
		default:
			break;
	}
};
const listenLogOut = (e, name) => {
	if (name === "Auth") {
		e.target.className === name.toLowerCase() + "__exit"
			? changeView("Start")
			: null;
	} else {
		e.target.className === name.toLowerCase() + "__logOut"
			? changeView("Start")
			: null;
		saveUserData();
	}
};
const listenBack = (e, name) => {
	e.target.className === name.toLowerCase() + "__back"
		? changeView("Menu")
		: null;
};

// Print Functions
const printView = () => {
	viewsList.forEach((view) => {
		view.state === false
			? (view.element.style.display = "none")
			: (view.element.style.display = "block");
	});
};
const printBalance = () => {
	const balanceTextElement = document.querySelector(".balance__text");
	balanceTextElement.textContent = `Tu saldo es de S/. ${user.balance.toFixed(
		2
	)}`;
};
const printDepositResult = (view, amount) => {
	const failDeposit = view.querySelector(".deposit-result__fail");
	const successDeposit = view.querySelector(".deposit-result__success");
	if (!amount) {
		console.error("No se pudo realizar el deposito.");
		failDeposit.style.display = "block";
		successDeposit.style.display = "none";
	} else {
		const resultElement = view.querySelector(".deposit-result__amount");
		const newBalanceElement = view.querySelector(
			".deposit-result__new-balance"
		);
		resultElement.textContent = `El monto ingresado fue de S/.${amount}`;
		newBalanceElement.textContent = `Tu nuevo saldo es de S/.${user.balance.toFixed(
			2
		)}`;
		failDeposit.style.display = "none";
		successDeposit.style.display = "block";
	}
};
const printWithdrawResult = (view, amount) => {
	const failWithdraw = document.querySelector(".withdraw-result__error");
	const successWithdraw = view.querySelector(".withdraw-result__success");
	if (!amount) {
		console.error("No se pudo realizar el retiro.");
		failWithdraw.style.display = "block";
		successWithdraw.style.display = "none";
	} else {
		const resultElement = view.querySelector(".withdraw-result__amount");
		const newBalanceElement = view.querySelector(
			".withdraw-result__new-balance"
		);
		resultElement.textContent = `El monto retirado fue de S/.${amount}`;
		newBalanceElement.textContent = `Tu nuevo saldo es de S/.${user.balance.toFixed(
			2
		)}`;
		failWithdraw.style.display = "none";
		successWithdraw.style.display = "block";
	}
};

// Account Operations
const addToBalance = (amountToAdd) => {
	user.balance += amountToAdd;
	printBalance();
};
const showDepositResult = (status, amount) => {
	if (!status) {
		const failResultSection = view.querySelector(".deposit-result__fail");
		failResultSection.style.display = "block";
	} else {
		const successResultSection = view.querySelector(".deposit-result__success");
		const resultElement = view.querySelector(".deposit-result__amount");
		const newBalanceElement = view.querySelector(
			".deposit-result__new-balance"
		);
		resultElement.textContent = `El monto ingresado fue de S/.${amount}`;
		newBalanceElement.textContent = `Tu nuevo saldo es de S/.${user.balance.toFixed(
			2
		)}`;
		successResultSection.style.display = "block";
	}
};
const substractFromBalance = (amountToSubstract) => {
	user.balance -= amountToSubstract;
	printBalance();
};
const saveUserData = () => {
	const userIndex = usersList.findIndex(
		(saveUser) => saveUser.dni === user.dni
	);
	usersList[userIndex] = user;
};

function startApp() {
	console.log("Iniciando App...");
	loadViews();
	loadListeners();
	console.log("🌟 App iniciada.");
}

startApp();
