/*
---
name: Behavior.PopUp
description: Adds a slide interface (FlexPopUp instance)
provides: [Behavior.PopUp]
requires: [Behavior/Behavior, /PopUp, /Delegator.PopUpControls, Slide/Behavior.Slide.Element]
script: Behavior.PopUp.js

Examples:
<a href="..." data-behavior="PopUp" data-trigger="PopUp.Open" data-gallery-element-width="600" data-gallery-element-height="830">open</a>

...
*/

Behavior.addGlobalFilter('PopUp', {

	defaults: {
		width: null,
		height: null,
		requestfilter: null,
		template: null
	},

	setup: function(element, api) {
		var options = {};
		if (api.getAs(Number, 'width') !== undefined) {
			options.width = api.getAs(Number, 'width');
		}
		if (api.getAs(Number, 'height') !== undefined) {
			options.height = api.getAs(Number, 'height');
		}
		if (api.getAs(String, 'requestfilter') !== undefined) {
			options.requestfilter = api.getAs(String, 'requestfilter');
		}
		if (api.getAs(String, 'template') !== undefined) {
			options.template = api.getAs(String, 'template');
		}
		var popUp = new PopUp(element, Object.merge(options, {
			onBuild: function(wrap) {
				wrap.store('Behavior Filter result:' + 'PopUp', popUp);
				wrap.set('data-behavior', 'PopUp');
				api.applyFilters(wrap);
			}
		}));

		return popUp;
	}

});