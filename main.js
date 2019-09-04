$('form').on('submit', function(e) {
	e.preventDefault();

	$('#results').html('<div class="loader">Loading...</div>');

	let promise = $.ajax({
		type: 'GET',
		url: 'https://www.reddit.com/r/' + $('#search').val() + '.json'
	});

	promise.then(function(subreddits) {
		let div = document.createElement('div');
		let fragment = document.createDocumentFragment();

		subreddits.data.children.forEach(function(subreddit) {

			let title = document.createElement('a');
			title.innerText = subreddit.data.title;
			title.href = subreddit.data.url;
			title.target = '_blank';

			let score = document.createElement('p');
			score.innerText = subreddit.data.score;

			let author = document.createElement('p');
			author.innerText = subreddit.data.author;

			div.append(title);
			div.append(score);
			div.append(author);
			fragment.append(div);
		});

		$('#results').html(fragment);
	});
});