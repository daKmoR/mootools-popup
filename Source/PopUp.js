/*
---

name: PopUp
description: allows to create almost any Sliding Stuff (Galleries, Tabs...) with multiple effects [CSS:PopUp/Source/Css/PopUpBase.css]
license: MIT-style license.
requires: [Slide/Behavior.Gallery.Element, /Overlay]
provides: PopUp

...
*/

var PopUp = new Class({

	Implements: [Options, Events],

	options: {/*
		onOpen: nil,
		onOpenEnd: nil,
		onClose: nil,
		onCloseEnd: nil,*/
		width: null,
		height: null,
		requestfilter: null,
		useOverlay: true,
		template: '<div class="popUp">' +
		          '  <a data-trigger="PopUp.Close" class="popUpCloseButton"><span>close</span></a>' +
		          '  <div data-behavior="Slide" data-slide-containerposition="true"></div>' +
		          '</div>'
	},

	isBuild: false,

	initialize: function(element, options) {
		this.setOptions(options);
		this.element = element;
	},

	build: function() {
		if (this.options.useOverlay) {
			this.overlay = new Overlay({ onClick: this.close.bind(this) });
			this.overlay.build();
		}

		var temp = new Element('div');
		temp.set('html', this.options.template);

		this.wrap = temp.getElement('*');
		this.wrap.inject(document.body);

		this.slide = this.wrap.getElement('[data-behavior="Slide"]');
		this.addElement(this.element);

		this.isBuild = true;
		this.fireEvent('build', this.wrap);
	},

	addElement: function(element) {
		if (this.slide) {
			var elementToAdd = element.clone();
			elementToAdd.set('data-behavior', 'Gallery.Element')
				.erase('data-trigger');

			if (Type.isNumber(this.options.width)) {
				elementToAdd.set('data-gallery-element-width', this.options.width);
			}
			if (Type.isNumber(this.options.height)) {
				elementToAdd.set('data-gallery-element-height', this.options.height);
			}
			if (Type.isString(this.options.requestfilter)) {
				elementToAdd.set('data-gallery-element-requestfilter', this.options.requestfilter);
			}
			this.slide.grab(elementToAdd);
		}
	},

	open: function() {
		if (this.isBuild === false) {
			this.build();
		}
		this.wrap.fade(1);
		if (this.options.useOverlay) {
			this.overlay.show();
		}
		this.fireEvent('open', this.wrap);
	},

	close: function() {
		this.wrap.fade(0);
		if(this.options.useOverlay) {
			this.overlay.hide();
		}
	}

});

