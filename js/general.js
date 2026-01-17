// Search and Filter Functionality
	const searchInput = document.getElementById('serviceSearch');
	const categoryBtns = document.querySelectorAll('.category-btn');
	const serviceCards = document.querySelectorAll('.service-card');
	const noResults = document.getElementById('noResults');
	let currentCategory = 'all';
	let currentSearch = '';

	function filterCards() {
		let visibleCount = 0;
		serviceCards.forEach(card => {
			const cardCategory = card.dataset.category;
			const cardTitle = card.dataset.title.toLowerCase();
			const cardDescription = card.dataset.description.toLowerCase();
			const searchTerm = currentSearch.toLowerCase();
			const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
			const matchesSearch = searchTerm === '' || cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm);
			if(matchesCategory && matchesSearch) {
				card.classList.remove('hidden');
				visibleCount++;
			} else {
				card.classList.add('hidden');
			}
		});
		// Show/hide no results message
		if(visibleCount === 0) {
			noResults.classList.add('visible');
		} else {
			noResults.classList.remove('visible');
		}
	}
	// Category filter click handler
	categoryBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			categoryBtns.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			currentCategory = btn.dataset.category;
			filterCards();
		});
	});
	searchInput.addEventListener('input', (e) => {
		currentSearch = e.target.value;
		filterCards();
	});
	filterToggle.addEventListener('click', () => {
		filterToggle.classList.toggle('expanded');
		categoryFilters.classList.toggle('visible');
	});
	// shuffling stats
	function shuffleNumber(element, duration = 400) {
		const target = element.dataset.target;
		const type = element.dataset.type;
		const startTime = performance.now();
		const shuffleChars = '0123456789';

		function getRandomChar() {
			return shuffleChars[Math.floor(Math.random() * shuffleChars.length)];
		}

		function animate(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Easing function for smooth deceleration
			const easeOut = 1 - Math.pow(1 - progress, 3);
			if(progress < 1) {
				// Generate shuffled version based on type
				let shuffled = '';
				if(type === 'percent') {
					shuffled = '%' + getRandomChar() + getRandomChar() + '.' + getRandomChar();
				} else if(type === 'number') {
					shuffled = '+' + getRandomChar() + ',' + getRandomChar() + getRandomChar() + getRandomChar();
				} else if(type === 'money') {
					shuffled = '$' + getRandomChar() + '.' + getRandomChar() + 'M+';
				}
				element.textContent = shuffled;
				requestAnimationFrame(animate);
			} else {
				// Animation complete - show final value
				element.textContent = target;
			}
		}
		requestAnimationFrame(animate);
	}
	// Intersection Observer to trigger animation when stats section is in view
	const statsSection = document.getElementById('statsSection');
	const statNumbers = document.querySelectorAll('.stat-number');
	let hasAnimated = false;
	const statsObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if(entry.isIntersecting && !hasAnimated) {
				hasAnimated = true;
				statNumbers.forEach((num, index) => {
					// Stagger the animations slightly
					setTimeout(() => {
						shuffleNumber(num, 500);
					}, index * 100);
				});
			}
		});
	}, {
		threshold: 0.3
	});
	statsObserver.observe(statsSection);