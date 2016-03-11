(() => {
	'use strict';

	var md = markdownit();
	var checkMsgBubbles = setInterval(() => {
		var msgBubble = document.querySelectorAll('.emojitext.selectable-text:not(.markdownParsed)');
		console.warn(`${msgBubble.length} bubbles with markdown checked`);
		Object.keys(msgBubble).forEach((i) => {
			var msgText = msgBubble[i].innerText;
			if (~msgText.indexOf("<markdown>")) {
				console.warn(msgText);
				msgBubble[i].innerHTML = md.render(msgText);
				msgBubble[i].classList.add('markdownParsed');
			}
		});
	}, 1000);

})();
