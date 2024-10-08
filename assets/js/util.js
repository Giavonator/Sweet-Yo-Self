

const prices = new Map();

prices.set('blueRainbowDrips', [6, 0]); 
prices.set('goldRainbowDrips', [10, 0]);

prices.set('blueSmoothieDrips', [7, 0]); 
prices.set('goldSmoothieDrips', [10, 0]);

prices.set('blueBerryDrips', [8, 0]); 
prices.set('goldBerryDrips', [11, 0]);

prices.set('blueSourDrips', [6, 0]); 
prices.set('goldSourDrips', [12, 0]);

prices.set('blueColorBombs', [5, 0]); 
prices.set('goldColorBombs', [8, 0]);

prices.set('blueCaramels', [6, 0]); 
prices.set('goldCaramels', [10, 0]);


var subtotal = 0;
var taxes = 0;
var shipping = 0;
var total = 0;


function orderChange(candyName, candyAmount){
	if(candyAmount > 0){


		subtotal -= prices.get(candyName)[0] * prices.get(candyName)[1];
		taxes -= prices.get(candyName)[0] * prices.get(candyName)[1] * 0.05;

		document.getElementById(candyName).style.display = 'flex';
		prices.set(candyName, [prices.get(candyName)[0], candyAmount]);

		var price = candyAmount * prices.get(candyName)[0];
		subtotal += price;
		taxes += price * 0.05;
		total = subtotal + taxes;

		document.getElementById(candyName + "Subtotal").innerHTML = "$" + price.toFixed(2);
		document.getElementById("subtotal").innerHTML = "$" + subtotal.toFixed(2);
		document.getElementById("taxes").innerHTML = "$" + taxes.toFixed(2);
		document.getElementById("total").innerHTML = "$" + total.toFixed(2);
		document.getElementById("subtotal1").innerHTML = "$" + subtotal.toFixed(2);
		document.getElementById("taxes1").innerHTML = "$" + taxes.toFixed(2);
		document.getElementById("total1").innerHTML = "$" + total.toFixed(2);
		
		// alert(candyName + '   ' + order.get(candyName));
		// var candy = document.getElementById('sample').cloneNode(true);
		// candy.id = candyName;
		// candy.style.display = 'block';
		// document.getElementById('items').appendChild(candy);
	}

	else{

		document.getElementById(candyName).style.display = 'none';

		subtotal -= prices.get(candyName)[0] * prices.get(candyName)[1];
		taxes -= prices.get(candyName)[0] * prices.get(candyName)[1] * 0.05;
		total = subtotal + taxes;

		prices.get(candyName)[1] = 0;
		document.getElementById("subtotal").innerHTML = "$" + subtotal.toFixed(2);
		document.getElementById("taxes").innerHTML = "$" + taxes.toFixed(2);
		document.getElementById("total").innerHTML = "$" + total.toFixed(2);
		document.getElementById("subtotal1").innerHTML = "$" + subtotal.toFixed(2);
		document.getElementById("taxes1").innerHTML = "$" + taxes.toFixed(2);
		document.getElementById("total1").innerHTML = "$" + total.toFixed(2);

	}
}



function sendEmail(name, email, subject, message){

	html = "<html lang='en-US'><body> <p style='margin-top:0px;font-size: 15px;font-weight:900;'>Message From: " + name + " - " + email + "</p><br>" + message + " <br/></body></html>";
	Email.send({
    	Host : "smtp.elasticemail.com",
    	Username : "gioalvez33@gmail.com",
    	Password : "2D25CCFBC7326FA88DEBEC83C6CD2DF681D1",
    	To : 'gioalvez33@gmail.com',
    	From : "contact@sweetyoself.com",
    	Subject : subject,
    	Body : html
		// Attachments : [{
		// 	name : "candy.jpg",
		// 	path : "https://sweetyoself.com/images/candy.jpg"
		// }]
	}).then( message => results(message));
}


function sendOrder(name, email, message, subtotal, taxes, total){

	const day = new Date();
	let orderNumber = name.substring(0,3) + day.getDate()+ (day.getMonth() + 1) + day.getYear();

	intro = "Someone ordered something, their information is below!";
	
	html = "<html lang='en-US'><body style='border: 12px solid #FF69D2;border-radius:5px;background-color:#FFE1F6;'>  <br/> <p style='margin-top:0px;text-align:center;font-size: 25px;color: green;font-weight:900;'>Dear Phoenix,</p>  <p style='margin-left:5%;margin-right:5%;text-align:center;border-bottom: 3px dashed #FF69D2;'> " + intro + "<br/><br/><br/></p> <p style='padding-left:5%;font-size: 20px;color: green;'>Name: " + name + "<br/>Email: " + email + "<br/>Phone Number: " + message + "<br/>Order Number: " + orderNumber +  "<br/><br/>Subtotal: " + subtotal + "<br/>Taxes: " + taxes +  "<br/>Total: " + total + " <br/><br/></p><img style='margin-left:5%;margin-right:5%;width:90%;' src='https://sweetyoself.com/images/rainbowdrips.jpg'/></body></html>";


	Email.send({
    	Host : "smtp.elasticemail.com",
    	Username : "gioalvez33@gmail.com",
    	Password : "2D25CCFBC7326FA88DEBEC83C6CD2DF681D1",
    	To : 'sweetyoselftoday@gmail.com',
    	From : "orders@sweetyoself.com",
    	Subject : "Order #" + orderNumber,
    	Body : html
	}).then( message => results(message));
}

function results(message){

	if(message == "OK"){
		alert("Your message has been sent!");
	}
	else alert("Something has gone wrong, please try again." + message);
}


let images = [
	[1, 0, 0, "imgRainbowDrips"],
	[1, 0, 0, "imgSourDrips"],
	[1, 0, 0, "imgBerryDrips"],
	[1, 0, 0, "imgSmoothieDrips"],
	[1, 0, 0, "imgCaramels"],
	[1, 0, 0, "imgColorBombs"],
	[1, 0, 0, "imgTesting1"],
	[1, 0, 0, "imgTesting2"],
];


function imageCycle(num, dir){

	let active = 0; num--;
	if(images[num][0] == 1){
		active = 0;
		images[num][0] = 0;
	}
	else if(images[num][1] == 1){
		active = 1;
		images[num][1] = 0;
	}
	else{
		active = 2;
		images[num][2] = 0;
	}

	//console.log("Active " + active);
	document.getElementById(images[num][3] + active).style.display = "none";

	if(dir == -1 && active == 0) active = 3;
	let next = (active + dir) % 3;

	//console.log("Next " + next);
	images[num][next] = 1;
	document.getElementById(images[num][3] + next).style.display = "block";


}


(function($) {

	/**
	 * Generate an indented list of links from a nav. Meant for use with panel().
	 * @return {jQuery} jQuery object.
	 */
	$.fn.navList = function() {

		var	$this = $(this);
			$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var	$this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
					'class="link depth-' + indent + '"' +
					( (typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
					( (typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
					'<span class="indent-' + indent + '"></span>' +
					$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Panel-ify an element.
	 * @param {object} userConfig User config.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function(userConfig) {

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).panel(userConfig);

				return $this;

			}

		// Vars.
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;

		// Config.
			config = $.extend({

				// Delay.
					delay: 0,

				// Hide panel on link click.
					hideOnClick: false,

				// Hide panel on escape keypress.
					hideOnEscape: false,

				// Hide panel on swipe.
					hideOnSwipe: false,

				// Reset scroll position on hide.
					resetScroll: false,

				// Reset forms on hide.
					resetForms: false,

				// Side of viewport the panel will appear.
					side: null,

				// Target element for "class".
					target: $this,

				// Class to toggle.
					visibleClass: 'visible'

			}, userConfig);

			// Expand "target" if it's not a jQuery object already.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);

		// Panel.

			// Methods.
				$this._hide = function(event) {

					// Already hidden? Bail.
						if (!config.target.hasClass(config.visibleClass))
							return;

					// If an event was provided, cancel it.
						if (event) {

							event.preventDefault();
							event.stopPropagation();

						}

					// Hide.
						config.target.removeClass(config.visibleClass);

					// Post-hide stuff.
						window.setTimeout(function() {

							// Reset scroll position.
								if (config.resetScroll)
									$this.scrollTop(0);

							// Reset forms.
								if (config.resetForms)
									$this.find('form').each(function() {
										this.reset();
									});

						}, config.delay);

				};

			// Vendor fixes.
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');

			// Hide on click.
				if (config.hideOnClick) {

					$this.find('a')
						.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

					$this
						.on('click', 'a', function(event) {

							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

							if (!href || href == '#' || href == '' || href == '#' + id)
								return;

							// Cancel original event.
								event.preventDefault();
								event.stopPropagation();

							// Hide panel.
								$this._hide();

							// Redirect to href.
								window.setTimeout(function() {

									if (target == '_blank')
										window.open(href);
									else
										window.location.href = href;

								}, config.delay + 10);

						});

				}

			// Event: Touch stuff.
				$this.on('touchstart', function(event) {

					$this.touchPosX = event.originalEvent.touches[0].pageX;
					$this.touchPosY = event.originalEvent.touches[0].pageY;

				})

				$this.on('touchmove', function(event) {

					if ($this.touchPosX === null
					||	$this.touchPosY === null)
						return;

					var	diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
						diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
						th = $this.outerHeight(),
						ts = ($this.get(0).scrollHeight - $this.scrollTop());

					// Hide on swipe?
						if (config.hideOnSwipe) {

							var result = false,
								boundary = 20,
								delta = 50;

							switch (config.side) {

								case 'left':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
									break;

								case 'right':
									result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
									break;

								case 'top':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
									break;

								case 'bottom':
									result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
									break;

								default:
									break;

							}

							if (result) {

								$this.touchPosX = null;
								$this.touchPosY = null;
								$this._hide();

								return false;

							}

						}

					// Prevent vertical scrolling past the top or bottom.
						if (($this.scrollTop() < 0 && diffY < 0)
						|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

							event.preventDefault();
							event.stopPropagation();

						}

				});

			// Event: Prevent certain events inside the panel from bubbling.
				$this.on('click touchend touchstart touchmove', function(event) {
					event.stopPropagation();
				});

			// Event: Hide panel if a child anchor tag pointing to its ID is clicked.
				$this.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.removeClass(config.visibleClass);

				});

		// Body.

			// Event: Hide panel on body click/tap.
				$body.on('click touchend', function(event) {
					$this._hide(event);
				});

			// Event: Toggle.
				$body.on('click', 'a[href="#' + id + '"]', function(event) {

					event.preventDefault();
					event.stopPropagation();

					config.target.toggleClass(config.visibleClass);

				});

		// Window.

			// Event: Hide on ESC.
				if (config.hideOnEscape)
					$window.on('keydown', function(event) {

						if (event.keyCode == 27)
							$this._hide(event);

					});

		return $this;

	};

	/**
	 * Apply "placeholder" attribute polyfill to one or more forms.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.placeholder = function() {

		// Browser natively supports placeholders? Bail.
			if (typeof (document.createElement('input')).placeholder != 'undefined')
				return $(this);

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).placeholder();

				return $this;

			}

		// Vars.
			var $this = $(this);

		// Text, TextArea.
			$this.find('input[type=text],textarea')
				.each(function() {

					var i = $(this);

					if (i.val() == ''
					||  i.val() == i.attr('placeholder'))
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('blur', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == '')
						i
							.addClass('polyfill-placeholder')
							.val(i.attr('placeholder'));

				})
				.on('focus', function() {

					var i = $(this);

					if (i.attr('name').match(/-polyfill-field$/))
						return;

					if (i.val() == i.attr('placeholder'))
						i
							.removeClass('polyfill-placeholder')
							.val('');

				});

		// Password.
			$this.find('input[type=password]')
				.each(function() {

					var i = $(this);
					var x = $(
								$('<div>')
									.append(i.clone())
									.remove()
									.html()
									.replace(/type="password"/i, 'type="text"')
									.replace(/type=password/i, 'type=text')
					);

					if (i.attr('id') != '')
						x.attr('id', i.attr('id') + '-polyfill-field');

					if (i.attr('name') != '')
						x.attr('name', i.attr('name') + '-polyfill-field');

					x.addClass('polyfill-placeholder')
						.val(x.attr('placeholder')).insertAfter(i);

					if (i.val() == '')
						i.hide();
					else
						x.hide();

					i
						.on('blur', function(event) {

							event.preventDefault();

							var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

							if (i.val() == '') {

								i.hide();
								x.show();

							}

						});

					x
						.on('focus', function(event) {

							event.preventDefault();

							var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

							x.hide();

							i
								.show()
								.focus();

						})
						.on('keypress', function(event) {

							event.preventDefault();
							x.val('');

						});

				});

		// Events.
			$this
				.on('submit', function() {

					$this.find('input[type=text],input[type=password],textarea')
						.each(function(event) {

							var i = $(this);

							if (i.attr('name').match(/-polyfill-field$/))
								i.attr('name', '');

							if (i.val() == i.attr('placeholder')) {

								i.removeClass('polyfill-placeholder');
								i.val('');

							}

						});

				})
				.on('reset', function(event) {

					event.preventDefault();

					$this.find('select')
						.val($('option:first').val());

					$this.find('input,textarea')
						.each(function() {

							var i = $(this),
								x;

							i.removeClass('polyfill-placeholder');

							switch (this.type) {

								case 'submit':
								case 'reset':
									break;

								case 'password':
									i.val(i.attr('defaultValue'));

									x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

									if (i.val() == '') {
										i.hide();
										x.show();
									}
									else {
										i.show();
										x.hide();
									}

									break;

								case 'checkbox':
								case 'radio':
									i.attr('checked', i.attr('defaultValue'));
									break;

								case 'text':
								case 'textarea':
									i.val(i.attr('defaultValue'));

									if (i.val() == '') {
										i.addClass('polyfill-placeholder');
										i.val(i.attr('placeholder'));
									}

									break;

								default:
									i.val(i.attr('defaultValue'));
									break;

							}
						});

				});

		return $this;

	};

	/**
	 * Moves elements to/from the first positions of their respective parents.
	 * @param {jQuery} $elements Elements (or selector) to move.
	 * @param {bool} condition If true, moves elements to the top. Otherwise, moves elements back to their original locations.
	 */
	$.prioritize = function($elements, condition) {

		var key = '__prioritize';

		// Expand $elements if it's not already a jQuery object.
			if (typeof $elements != 'jQuery')
				$elements = $($elements);

		// Step through elements.
			$elements.each(function() {

				var	$e = $(this), $p,
					$parent = $e.parent();

				// No parent? Bail.
					if ($parent.length == 0)
						return;

				// Not moved? Move it.
					if (!$e.data(key)) {

						// Condition is false? Bail.
							if (!condition)
								return;

						// Get placeholder (which will serve as our point of reference for when this element needs to move back).
							$p = $e.prev();

							// Couldn't find anything? Means this element's already at the top, so bail.
								if ($p.length == 0)
									return;

						// Move element to top of parent.
							$e.prependTo($parent);

						// Mark element as moved.
							$e.data(key, $p);

					}

				// Moved already?
					else {

						// Condition is true? Bail.
							if (condition)
								return;

						$p = $e.data(key);

						// Move element back to its original location (using our placeholder).
							$e.insertAfter($p);

						// Unmark element as moved.
							$e.removeData(key);

					}

			});

	};

})(jQuery);