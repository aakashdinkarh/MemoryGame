(function () {
	const images = ['panda.jpg', 'cat.jpg', 'panda.jpg', 'cat.jpg', 'mickey.jpg', 'mickey.jpg'];
	const imagesPerRow = 3;

	let winMessageShown = false;
	const __moves__ = document.getElementById('moves');
	const __restartBtn__ = document.getElementById('restart-btn');
	const __gameBoard__ = document.getElementById('gameBoard');
	const __gameWonMsg__ = document.getElementById('gameWonMsg');
	const __toggleSwitch__ = document.querySelector('.theme-slider input[type="checkbox"]');
	const __slider__ = document.querySelector('.theme-slider .slider');
	const __getMatchElements__ = () => document.getElementsByClassName('match');
	const __getAllImageDiv__ = () => document.querySelectorAll('.imageDiv');
	const __getShowingElements__ = () => document.getElementsByClassName('show');

	function restartGame() {
		__gameBoard__.innerHTML = '';
		__gameWonMsg__.innerText = '';
		winMessageShown = false;

		startGame();
	}

	function startGame() {
		let moves = 0;
		renderMoves(moves);

		const shuffledImages = shuffleImages(images);
		generateBoard(shuffledImages);

		function updateScore() {
			moves++;
			renderMoves(moves);
		}

		__getAllImageDiv__().forEach((div) => {
			div.addEventListener('click', function (event) {
				handleCardClick(event, moves, updateScore);
			});
		});
	}

	function renderMoves(moves = 0) {
		__moves__.innerText = `Moves: ${moves}`;
	}

	function shuffleImages(imagesArray) {
		let copy = [...imagesArray];
		let shuffled = [];
		while (copy.length) {
			let randomIndex = Math.floor(Math.random() * copy.length);
			shuffled.push(copy.splice(randomIndex, 1)[0]);
		}
		return shuffled;
	}

	function generateBoard(images) {
		const fragment = document.createDocumentFragment();
		let row = document.createElement('div');

		images.forEach((image, index) => {
			const div = document.createElement('div');
			div.setAttribute('class', 'imageDiv');

			const img = document.createElement('img');
			img.setAttribute('src', image);
			img.setAttribute('class', 'hide');

			div.appendChild(img);
			row.appendChild(div);

			if ((index + 1) % imagesPerRow === 0) {
				fragment.appendChild(row);
				row = document.createElement('div');
			}
		});

		__gameBoard__.replaceChildren(fragment);
	}

	function handleCardClick(event, moves, updateScore) {
		if (winMessageShown) return;

		updateScore();
		const clickedImage = event.currentTarget.children[0];
		const showingImages = __getShowingElements__();

		let matchFound = false;

		if (showingImages.length >= 1) {
			[...showingImages].forEach((showingImage) => {
				if (showingImage.src !== clickedImage.src) {
					showingImage.classList.remove('show');
				} else {
					showingImage.classList.add('match');
					clickedImage.classList.add('match');
					matchFound = true;
				}
			});
		}

		if (!matchFound) {
			clickedImage.classList.add('show');
		}

		if (__getMatchElements__().length === images.length) {
			displayWinMessage(moves + 1);
		}
	}

	function displayWinMessage(moves) {
		winMessageShown = true;
		__gameWonMsg__.innerText = `You've won!! Moves = ${moves}`;
	}

	document.addEventListener('DOMContentLoaded', () => {
		document.body.style.cssText = `transition: background-color 0.3s, color 0.3s;`;
		startGame();
		__restartBtn__.onclick = restartGame;

		/* theme slider logic --- START --- */
		__toggleSwitch__.onchange = toggleTheme;
		__toggleSwitch__.checked = document.body.className === 'dark-theme';
		setTimeout(() => {
			__slider__.classList.add('slider-transition-class');
		}, 0);
		/* theme slider logic --- END --- */

		function toggleTheme(e) {
			const isDarkThemeEnabled = e.target.checked;

			if (isDarkThemeEnabled) {
				document.body.className = 'dark-theme';
			} else {
				document.body.className = 'light-theme';
			}
			saveIsDarkThemeEnabledToLocalStorage(isDarkThemeEnabled);
		};
	});
})();
