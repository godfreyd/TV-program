"use strict";

var progressbar = document.querySelectorAll('.progressbar');

for (var i = 0; i < progressbar.length; i++) {


	var options = {
		percent:  progressbar[i].getAttribute('data-percent') || 25,
		size: progressbar[i].getAttribute('data-size') || 40, 
		lineWidth: progressbar[i].getAttribute('data-line') || 5,// ширина линии, по умолчанию 5
		rotate: progressbar[i].getAttribute('data-rotate') || 0,
		colorLite: progressbar[i].getAttribute('data-colorlite') || '#efefef', // цвет фоновой линии
		color: progressbar[i].getAttribute('data-color') || '#fc0' // цвет активной линии
	}


	var canvas = document.createElement('canvas');
	var span = document.createElement('span');

	if (options.percent > 60 && options.percent < 70) {
	
		var newminuts = options.percent - 60;
		span.textContent = '1' + ':' + '0' + newminuts;
	 
	} else if (options.percent > 70) {
	
		var newminuts = options.percent - 60;
		span.textContent = '1' + ':' + newminuts;
	 
	}  else if (options.percent == 60) {
	
		span.textContent = '1' + ':' + '00';
	
	}  else {

		span.textContent = '0' + ':' + options.percent;
	}
	
	if (typeof(G_vmlCanvasManager) !== 'undefined') {
		G_vmlCanvasManager.initElement(canvas);
	}

	var context = canvas.getContext('2d');
	canvas.width = canvas.height = options.size;

	progressbar[i].appendChild(span);
	progressbar[i].appendChild(canvas);

	context.translate(options.size / 2, options.size / 2); // change center
	context.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg


	var radius = (options.size - options.lineWidth) / 2;

	var drawCircle = function(color, lineWidth, percent) {
			percent = Math.min(Math.max(0, percent || 1), 1);
			context.beginPath();
			context.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
			context.strokeStyle = color; // цвет круга
			context.lineCap = 'round'; // округляем концы
			context.lineWidth = lineWidth; // толщина линии
			context.stroke();
	};

	drawCircle(options.colorLite, options.lineWidth, 100 / 100); // рисуем большой круг
	drawCircle(options.color, options.lineWidth, options.percent / 100); // рисуем малый круг


}






