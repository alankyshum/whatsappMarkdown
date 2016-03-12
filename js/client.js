(() => {
	'use strict';

	var md = markdownit();
	var _TAGS = ["<markdown>", "//md//"],
		_TAG_HTML = "<span class='markdownLabel'> </span>";
	var checkMsgBubbles = setInterval(() => {
		var msgBubble = document.querySelectorAll('.emojitext.selectable-text:not(.markdownParsed)');
		Object.keys(msgBubble).forEach((i) => {
			var msgText = msgBubble[i].innerText;
			var _usedTag = null;
			_TAGS.every((tag) => {
				if (~msgText.indexOf(tag)) {
					_usedTag = tag;
					return false;
				}
				return true;
			})
			if (_usedTag) {
				msgText = msgText.slice(_usedTag.length);
				msgBubble[i].innerHTML = _TAG_HTML + md.render(msgText);
				msgBubble[i].classList.add('markdownParsed');

				// SYNTAX HIGHLIGHT
				var codes = msgBubble[i].querySelectorAll('code[class*=language-]');
				Object.keys(codes).forEach((code_i) => {
					codes[code_i].parentNode.classList.add('line-numbers');
					Prism.highlightElement(codes[code_i]);
				});
			}
		});
	}, 1000);

})();
