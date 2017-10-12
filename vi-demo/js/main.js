'use strict';

window.V = (function(V, window, document, undefined) {
	var placementId = 'pltrmsvvgw9fax8k6az';
	var currentAd = null;


	/**
	 * An event handler for the load event of a window.
	 */
	V.onload = function() {
		var playAdBtn = document.getElementById('playAdBtn');
		playAdBtn.addEventListener('click', function() {
			playAd();
		}, false);
	};

	window.onerror = function (err, file, line) {
		// Ignore useless CORS errors
		if(!file) {
			return;
		}

		customLog('| Exception: ' + err + '   /   In file: ' + file + '   /   On line: ' + line);
	//	return true;
	};

	/**
	 * Custom logging.
	 *
	 * @param {String} msg   The message to log
	 */
	function customLog(msg) {
		// Get the existing concatenated message
		window.msgg = window.msgg || '';

		// Reset the concatenated message if it exceeds 2000 characters
		(window.msgg.length > 2000) && (window.msgg = '');

		// Concatenate the current message
		window.msgg += ' / ' + msg;

		// Log on screen
		var logDiv = document.getElementById('log');
		if(logDiv) {
			logDiv.classList.remove('displayNone');
			logDiv.firstChild.nodeValue = window.msgg.toString();
		}
	}


	/************************************************************************************
	 *
	 *			Ad control
	 *
	 ***********************************************************************************/

	/**
	 * Play an ad using the vi SDK.
	 */
	function playAd() {
		var ad = new window.vi.Ad({
			appId              : 'ai.vi.testapp',
			appVer             : '1.00',
			placementId        : placementId,

			storeId            : '',

			ip                 : '',
			manufacturer       : '',
			model              : '',
			connectionType     : '',
			connectionProvider : '',
			language           : '',
			width              : 854,
			height             : 480,
			os                 : '',
			osVersion          : '',
			orientation        : '',

			age                : '',
			gender             : '',
			advertiserId       : '',

			latitude           : '',
			longitude          : '',
			accuracy           : ''

//			videoSlot          : document.getElementById('vid')
		});
		ad.onAdReady = function() {
//			customLog('-> adStart');
			currentAd = this;

			// Start the ad
			this.startAd();
		};
		ad.onAutoPlayFailed = function(reason, videoElement) {
//			customLog('-> autoplay failed: ' + reason);

			// Auto-play can only be initiated by a user gesture
			if(reason && reason.name && reason.name.indexOf('NotAllowedError') !== -1) {
				var overlay = document.getElementById('userGesture');
				overlay.classList.remove('displayNone');
				var overlayBtn = document.getElementById('userGesturePlay');

				var autoPlay = function() {
					overlayBtn.removeEventListener('click', autoPlay, false);
					overlay.classList.add('displayNone');

					videoElement && videoElement.play();
				};
				overlayBtn.addEventListener('click', autoPlay, false);
			}
		};
		ad.onAdStarted = function() {

		};
		ad.onAdClick = function() {

		};
		ad.onAdStopped = function(reason) {
			currentAd = null;

			if(reason === 'complete') {
//				customLog('-> adFinish');
			}
			else if(reason === 'userexit') {
//				customLog('-> adStoppedByUser');
			}
		};
		ad.onAdError = function(msg) {
			customLog('-> adError: ' + msg);
			currentAd && (currentAd = null);
		};

		ad.initAd();
	}

	return V;
}(window.V || {}, window, window.document));
