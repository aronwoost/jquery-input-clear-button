(function(global){
	function init() {
		$("input").each(function(){
			function trigger(){
				//TODO make close btn visible only when text was entered
			}

			var input = $(this),
				position = input.position(),
				input_height = input.outerHeight(),
				input_width = input.outerWidth(),
				//TODO whats the best way to style the clear cross?
				//Images not. SVG? Font? Pure CSS? Pure CSS it might be. 
				properties = { 
					left: (position.left + input_width - input_height + 3) + "px", 
					top: (position.top + 3) + "px", 
					width: input_height + "px",
					height: input_height + "px",
					position: "absolute",
					display: "none",
					backgroundColor: "red"
				},
				clickEvent = 'ontouchstart' in document.documentElement ? "touchstart" : "click",
				btn = $("<div></div>"),
				interval;

			input.after(btn);
			btn.css(properties);
			btn.bind(clickEvent, function(evt){
				input.val("");
				input.focus();
				clearInterval(interval);
				interval = null;
			});

			$(this).bind('keyup', trigger);
			$(this).live('focus', function(evt){
				btn.css("display", "block");
			});

			//TODO smarter handling of input field blur event
			$(this).live('blur', function(evt){
				interval = setInterval(hideBtn, 250);
			});

			function hideBtn() {
				btn.css("display", "none");
				clearInterval(interval);
				interval = null;

			}
		});
	}

	global.JQueryInputCloseBtn = {
		init: init
	};
}(this));