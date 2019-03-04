/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "dc0e9e532038ae77dee6";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.tsx":
/*!*****************!*\
  !*** ./app.tsx ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var App = function App(props) {
  return React.createElement("div", {
    className: "container"
  }, props.children);
};

exports.App = App;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\app.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./appProvider.tsx":
/*!*************************!*\
  !*** ./appProvider.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _reactHotLoader = __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");

var _store = __webpack_require__(/*! ./store */ "./store.ts");

var _appRouter = __webpack_require__(/*! ./appRouter */ "./appRouter.tsx");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var AppProvider = function AppProvider(props) {
  return React.createElement(_reactRedux.Provider, {
    store: _store.store
  }, React.createElement(_appRouter.AppRouter, null));
};

var _default = (0, _reactHotLoader.hot)(module)(AppProvider);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppProvider, "AppProvider", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\appProvider.tsx");
  reactHotLoader.register(_default, "default", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\appProvider.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./appRouter.tsx":
/*!***********************!*\
  !*** ./appRouter.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _reactRouter = __webpack_require__(/*! react-router */ "../node_modules/react-router/es/index.js");

var _history = __webpack_require__(/*! ./history */ "./history.ts");

var _routes = __webpack_require__(/*! ./routes */ "./routes.tsx");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var AppRouter = function AppRouter() {
  return React.createElement(_reactRouter.Router, {
    history: _history.history
  }, React.createElement(_routes.Routes, null));
};

exports.AppRouter = AppRouter;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppRouter, "AppRouter", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\appRouter.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./common/components/form/button.tsx":
/*!*******************************************!*\
  !*** ./common/components/form/button.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Button = function Button(props) {
  return React.createElement("button", {
    type: props.type,
    className: "btn btn-lg btn-success btn-block",
    onClick: onClick(props)
  }, props.label);
};

exports.Button = Button;
Button.defaultProps = {
  type: 'submit'
};

var onClick = function onClick(props) {
  return function (e) {
    e.preventDefault();
    props.onClick();
  };
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Button, "Button", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\form\\button.tsx");
  reactHotLoader.register(onClick, "onClick", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\form\\button.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./common/components/form/index.ts":
/*!*****************************************!*\
  !*** ./common/components/form/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(/*! ./button */ "./common/components/form/button.tsx");

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _button[key];
    }
  });
});

var _input = __webpack_require__(/*! ./input */ "./common/components/form/input.tsx");

Object.keys(_input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _input[key];
    }
  });
});

/***/ }),

/***/ "./common/components/form/input.tsx":
/*!******************************************!*\
  !*** ./common/components/form/input.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Input = function Input(props) {
  return React.createElement("div", {
    className: "form-group"
  }, React.createElement("label", {
    htmlFor: props.name
  }, props.label), React.createElement("div", {
    className: "field"
  }, React.createElement("input", {
    type: props.type,
    name: props.name,
    className: "form-control ".concat(buildErrorClass(props.error)),
    placeholder: props.placeholder,
    value: props.value,
    onChange: onChange(props),
    onBlur: props.onBlur
  }), Boolean(props.error) && React.createElement("div", {
    className: "invalid-feedback"
  }, props.error)));
};

exports.Input = Input;

var buildErrorClass = function buildErrorClass(error) {
  return Boolean(error) ? 'is-invalid' : '';
};

var onChange = function onChange(props) {
  return function (e) {
    props.onChange(e.target.name, e.target.value);
  };
};

Input.defaultProps = {
  type: 'text'
};
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Input, "Input", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\form\\input.tsx");
  reactHotLoader.register(buildErrorClass, "buildErrorClass", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\form\\input.tsx");
  reactHotLoader.register(onChange, "onChange", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\form\\input.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./common/components/panel/components/body.tsx":
/*!*****************************************************!*\
  !*** ./common/components/panel/components/body.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Body = function Body(props) {
  return React.createElement("ul", {
    className: "list-group list-group-flush"
  }, React.createElement("li", {
    className: "list-group-item"
  }, props.children));
};

exports.Body = Body;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Body, "Body", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\panel\\components\\body.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./common/components/panel/components/header.tsx":
/*!*******************************************************!*\
  !*** ./common/components/panel/components/header.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Header = function Header(props) {
  return React.createElement("div", {
    className: "card-header"
  }, React.createElement("h3", {
    className: "panel-title"
  }, props.title));
};

exports.Header = Header;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Header, "Header", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\panel\\components\\header.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./common/components/panel/components/index.ts":
/*!*****************************************************!*\
  !*** ./common/components/panel/components/index.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _body = __webpack_require__(/*! ./body */ "./common/components/panel/components/body.tsx");

Object.keys(_body).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _body[key];
    }
  });
});

var _header = __webpack_require__(/*! ./header */ "./common/components/panel/components/header.tsx");

Object.keys(_header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _header[key];
    }
  });
});

/***/ }),

/***/ "./common/components/panel/index.ts":
/*!******************************************!*\
  !*** ./common/components/panel/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _panel = __webpack_require__(/*! ./panel */ "./common/components/panel/panel.tsx");

Object.keys(_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _panel[key];
    }
  });
});

/***/ }),

/***/ "./common/components/panel/panel.tsx":
/*!*******************************************!*\
  !*** ./common/components/panel/panel.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _components = __webpack_require__(/*! ./components */ "./common/components/panel/components/index.ts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Panel = function Panel(props) {
  return React.createElement("div", {
    className: "card"
  }, React.createElement(_components.Header, {
    title: props.title
  }), React.createElement(_components.Body, null, props.children));
};

exports.Panel = Panel;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Panel, "Panel", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\components\\panel\\panel.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./common/constants/routes/index.ts":
/*!******************************************!*\
  !*** ./common/constants/routes/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var routes = {
  default: '/',
  members: '/members'
};
exports.routes = routes;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(routes, "routes", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\common\\constants\\routes\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./history.ts":
/*!********************!*\
  !*** ./history.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = void 0;

var _history = __webpack_require__(/*! history */ "../node_modules/history/es/index.js");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var history = (0, _history.createHashHistory)();
exports.history = history;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(history, "history", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\history.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var ReactDOM = _interopRequireWildcard(__webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js"));

var _appProvider = _interopRequireDefault(__webpack_require__(/*! ./appProvider */ "./appProvider.tsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

ReactDOM.render(React.createElement(_appProvider.default, null), document.getElementById('root'));

/***/ }),

/***/ "./pages/index.ts":
/*!************************!*\
  !*** ./pages/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = __webpack_require__(/*! ./login */ "./pages/login/index.ts");

Object.keys(_login).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _login[key];
    }
  });
});

var _members = __webpack_require__(/*! ./members */ "./pages/members/index.ts");

Object.keys(_members).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _members[key];
    }
  });
});

var _reducers = __webpack_require__(/*! ./reducers */ "./pages/reducers.ts");

Object.keys(_reducers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reducers[key];
    }
  });
});

/***/ }),

/***/ "./pages/login/actions/actionIds.ts":
/*!******************************************!*\
  !*** ./pages/login/actions/actionIds.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionIds = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var actionIds = {
  UPDATE_LOGIN_ENTITY_FIELD: 'UPDATE_LOGIN_ENTITY_FIELD',
  UPDATE_LOGIN_FORM_ERRORS: 'UPDATE_LOGIN_FORM_ERRORS'
};
exports.actionIds = actionIds;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(actionIds, "actionIds", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\actions\\actionIds.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/actions/loginRequest.ts":
/*!*********************************************!*\
  !*** ./pages/login/actions/loginRequest.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRequest = void 0;

var _validations = __webpack_require__(/*! ../validations */ "./pages/login/validations.ts");

var _mappers = __webpack_require__(/*! ../mappers */ "./pages/login/mappers.ts");

var _login = __webpack_require__(/*! ../../../rest-api/api/login */ "./rest-api/api/login.ts");

var _history = __webpack_require__(/*! ../../../history */ "./history.ts");

var _routes = __webpack_require__(/*! ../../../common/constants/routes */ "./common/constants/routes/index.ts");

var _actionIds = __webpack_require__(/*! ./actionIds */ "./pages/login/actions/actionIds.ts");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var loginRequest = function loginRequest(loginEntity) {
  return function (dispatch) {
    return _validations.validations.validateForm(loginEntity).then(function (formValidationResult) {
      formValidationResult.succeeded ? doLogin(loginEntity) : dispatch(updateLoginFormErrors(formValidationResult.fieldErrors));
    });
  };
};

exports.loginRequest = loginRequest;

var doLogin = function doLogin(loginEntity) {
  var loginEntityModel = (0, _mappers.mapLoginEntityVMToModel)(loginEntity);
  (0, _login.login)(loginEntityModel).then(function () {
    _history.history.push(_routes.routes.members);
  }).catch(console.log);
};

var updateLoginFormErrors = function updateLoginFormErrors(fieldErrors) {
  return {
    type: _actionIds.actionIds.UPDATE_LOGIN_FORM_ERRORS,
    payload: fieldErrors
  };
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(loginRequest, "loginRequest", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\actions\\loginRequest.ts");
  reactHotLoader.register(doLogin, "doLogin", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\actions\\loginRequest.ts");
  reactHotLoader.register(updateLoginFormErrors, "updateLoginFormErrors", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\actions\\loginRequest.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/actions/updateLoginEntityField.ts":
/*!*******************************************************!*\
  !*** ./pages/login/actions/updateLoginEntityField.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoginEntityFieldCompleted = exports.updateLoginEntityField = void 0;

var _actionIds = __webpack_require__(/*! ./actionIds */ "./pages/login/actions/actionIds.ts");

var _validations = __webpack_require__(/*! ../validations */ "./pages/login/validations.ts");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var updateLoginEntityField = function updateLoginEntityField(loginEntity, fieldName, value) {
  return function (dispatch) {
    return _validations.validations.validateField(loginEntity, fieldName, value).then(function (fieldValidationResult) {
      dispatch(updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult));
    });
  };
};

exports.updateLoginEntityField = updateLoginEntityField;

var updateLoginEntityFieldCompleted = function updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult) {
  return {
    type: _actionIds.actionIds.UPDATE_LOGIN_ENTITY_FIELD,
    payload: {
      fieldName: fieldName,
      value: value,
      fieldValidationResult: fieldValidationResult
    }
  };
};

exports.updateLoginEntityFieldCompleted = updateLoginEntityFieldCompleted;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(updateLoginEntityField, "updateLoginEntityField", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\actions\\updateLoginEntityField.ts");
  reactHotLoader.register(updateLoginEntityFieldCompleted, "updateLoginEntityFieldCompleted", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\actions\\updateLoginEntityField.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/components/form.tsx":
/*!*****************************************!*\
  !*** ./pages/login/components/form.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _form = __webpack_require__(/*! ../../../common/components/form */ "./common/components/form/index.ts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Form = function Form(props) {
  return React.createElement("form", {
    role: "form"
  }, React.createElement("fieldset", null, React.createElement(_form.Input, {
    name: "login",
    label: "Login",
    onChange: props.updateField,
    placeholder: "E-mail",
    value: props.loginEntity.login,
    error: props.loginFormErrors.login.errorMessage
  }), React.createElement(_form.Input, {
    type: "password",
    name: "password",
    label: "Password",
    onChange: props.updateField,
    placeholder: "password",
    value: props.loginEntity.password,
    error: props.loginFormErrors.password.errorMessage
  }), React.createElement(_form.Button, {
    onClick: props.doLogin,
    label: "Login"
  })));
};

exports.Form = Form;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Form, "Form", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\components\\form.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/components/index.ts":
/*!*****************************************!*\
  !*** ./pages/login/components/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = __webpack_require__(/*! ./form */ "./pages/login/components/form.tsx");

Object.keys(_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _form[key];
    }
  });
});

/***/ }),

/***/ "./pages/login/index.ts":
/*!******************************!*\
  !*** ./pages/login/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageContainer = __webpack_require__(/*! ./pageContainer */ "./pages/login/pageContainer.tsx");

Object.keys(_pageContainer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pageContainer[key];
    }
  });
});

var _reducers = __webpack_require__(/*! ./reducers */ "./pages/login/reducers/index.ts");

Object.keys(_reducers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reducers[key];
    }
  });
});

/***/ }),

/***/ "./pages/login/mappers.ts":
/*!********************************!*\
  !*** ./pages/login/mappers.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapLoginEntityVMToModel = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var mapLoginEntityVMToModel = function mapLoginEntityVMToModel(loginEntity) {
  return Boolean(loginEntity) ? Object.assign({}, loginEntity) : null;
};

exports.mapLoginEntityVMToModel = mapLoginEntityVMToModel;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapLoginEntityVMToModel, "mapLoginEntityVMToModel", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\mappers.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/page.tsx":
/*!******************************!*\
  !*** ./pages/login/page.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPage = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _panel = __webpack_require__(/*! ../../common/components/panel */ "./common/components/panel/index.ts");

var _components = __webpack_require__(/*! ./components */ "./pages/login/components/index.ts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var LoginPage = function LoginPage(props) {
  return React.createElement(_panel.Panel, {
    title: "Please sign in"
  }, React.createElement(_components.Form, Object.assign({}, props)));
};

exports.LoginPage = LoginPage;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LoginPage, "LoginPage", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\page.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/pageContainer.tsx":
/*!***************************************!*\
  !*** ./pages/login/pageContainer.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPageContainer = void 0;

var _reactRedux = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");

var _updateLoginEntityField = __webpack_require__(/*! ./actions/updateLoginEntityField */ "./pages/login/actions/updateLoginEntityField.ts");

var _loginRequest = __webpack_require__(/*! ./actions/loginRequest */ "./pages/login/actions/loginRequest.ts");

var _page = __webpack_require__(/*! ./page */ "./pages/login/page.tsx");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var mapStateToProps = function mapStateToProps(state) {
  return {
    loginEntity: state.login.loginEntity,
    loginFormErrors: state.login.loginFormErrors
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateField: function updateField(loginEntity) {
      return function (fieldName, value) {
        return dispatch((0, _updateLoginEntityField.updateLoginEntityField)(loginEntity, fieldName, value));
      };
    },
    doLogin: function doLogin(loginEntity) {
      return function () {
        return dispatch((0, _loginRequest.loginRequest)(loginEntity));
      };
    }
  };
};

var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, {
    updateField: dispatchProps.updateField(stateProps.loginEntity),
    doLogin: dispatchProps.doLogin(stateProps.loginEntity)
  });
};

var LoginPageContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_page.LoginPage);
exports.LoginPageContainer = LoginPageContainer;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\pageContainer.tsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\pageContainer.tsx");
  reactHotLoader.register(mergeProps, "mergeProps", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\pageContainer.tsx");
  reactHotLoader.register(LoginPageContainer, "LoginPageContainer", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\pageContainer.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/reducers/index.ts":
/*!***************************************!*\
  !*** ./pages/login/reducers/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = __webpack_require__(/*! ./login */ "./pages/login/reducers/login.ts");

Object.keys(_login).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _login[key];
    }
  });
});

/***/ }),

/***/ "./pages/login/reducers/login.ts":
/*!***************************************!*\
  !*** ./pages/login/reducers/login.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginReducer = void 0;

var _actionIds = __webpack_require__(/*! ../actions/actionIds */ "./pages/login/actions/actionIds.ts");

var _viewModel = __webpack_require__(/*! ../viewModel */ "./pages/login/viewModel.ts");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createEmptyState = function createEmptyState() {
  return {
    loginEntity: (0, _viewModel.createEmptyLoginEntity)(),
    loginFormErrors: (0, _viewModel.createEmptyLoginFormErrors)()
  };
};

var loginReducer = function loginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : createEmptyState();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionIds.actionIds.UPDATE_LOGIN_ENTITY_FIELD:
      return handleUpdateLoginEntityField(state, action.payload);

    case _actionIds.actionIds.UPDATE_LOGIN_FORM_ERRORS:
      return handleUpdateLoginFormErrors(state, action.payload);
  }

  return state;
};

exports.loginReducer = loginReducer;

var handleUpdateLoginEntityField = function handleUpdateLoginEntityField(state, _ref) {
  var fieldName = _ref.fieldName,
      value = _ref.value,
      fieldValidationResult = _ref.fieldValidationResult;
  return {
    loginEntity: Object.assign({}, state.loginEntity, _defineProperty({}, fieldName, value)),
    loginFormErrors: Object.assign({}, state.loginFormErrors, _defineProperty({}, fieldName, fieldValidationResult))
  };
};

var handleUpdateLoginFormErrors = function handleUpdateLoginFormErrors(state, loginFormErrors) {
  return Object.assign({}, state, {
    loginFormErrors: loginFormErrors
  });
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createEmptyState, "createEmptyState", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\reducers\\login.ts");
  reactHotLoader.register(loginReducer, "loginReducer", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\reducers\\login.ts");
  reactHotLoader.register(handleUpdateLoginEntityField, "handleUpdateLoginEntityField", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\reducers\\login.ts");
  reactHotLoader.register(handleUpdateLoginFormErrors, "handleUpdateLoginFormErrors", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\reducers\\login.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/validations.ts":
/*!************************************!*\
  !*** ./pages/login/validations.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validations = void 0;

var _lcFormValidation = __webpack_require__(/*! lc-form-validation */ "../node_modules/lc-form-validation/dist/lc-form-validation.js");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var validationConstraints = {
  fields: {
    login: [{
      validator: _lcFormValidation.Validators.required
    }],
    password: [{
      validator: _lcFormValidation.Validators.required
    }]
  }
};
var validations = (0, _lcFormValidation.createFormValidation)(validationConstraints);
exports.validations = validations;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validationConstraints, "validationConstraints", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\validations.ts");
  reactHotLoader.register(validations, "validations", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\validations.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/login/viewModel.ts":
/*!**********************************!*\
  !*** ./pages/login/viewModel.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptyLoginFormErrors = exports.createEmptyLoginEntity = void 0;

var _lcFormValidation = __webpack_require__(/*! lc-form-validation */ "../node_modules/lc-form-validation/dist/lc-form-validation.js");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var createEmptyLoginEntity = function createEmptyLoginEntity() {
  return {
    login: '',
    password: ''
  };
};

exports.createEmptyLoginEntity = createEmptyLoginEntity;

var createEmptyLoginFormErrors = function createEmptyLoginFormErrors() {
  return {
    login: new _lcFormValidation.FieldValidationResult(),
    password: new _lcFormValidation.FieldValidationResult()
  };
};

exports.createEmptyLoginFormErrors = createEmptyLoginFormErrors;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(createEmptyLoginEntity, "createEmptyLoginEntity", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\viewModel.ts");
  reactHotLoader.register(createEmptyLoginFormErrors, "createEmptyLoginFormErrors", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\login\\viewModel.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/index.ts":
/*!********************************!*\
  !*** ./pages/members/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = __webpack_require__(/*! ./list */ "./pages/members/list/index.ts");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

/***/ }),

/***/ "./pages/members/list/actions/actionIds.ts":
/*!*************************************************!*\
  !*** ./pages/members/list/actions/actionIds.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionIds = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var actionIds = {
  UPDATE_MEMBERS: 'UPDATE_MEMBERS'
};
exports.actionIds = actionIds;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(actionIds, "actionIds", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\actions\\actionIds.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/components/body.tsx":
/*!************************************************!*\
  !*** ./pages/members/list/components/body.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _row = __webpack_require__(/*! ./row */ "./pages/members/list/components/row.tsx");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Body = function Body(props) {
  return React.createElement("tbody", null, props.members.map(function (member) {
    return React.createElement(_row.Row, {
      key: member.id,
      member: member
    });
  }));
};

exports.Body = Body;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Body, "Body", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\components\\body.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/components/header.tsx":
/*!**************************************************!*\
  !*** ./pages/members/list/components/header.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Header = function Header(props) {
  return React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Avatar"), React.createElement("th", null, "Id"), React.createElement("th", null, "Name")));
};

exports.Header = Header;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Header, "Header", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\components\\header.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/components/index.ts":
/*!************************************************!*\
  !*** ./pages/members/list/components/index.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table = __webpack_require__(/*! ./table */ "./pages/members/list/components/table.tsx");

Object.keys(_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _table[key];
    }
  });
});

/***/ }),

/***/ "./pages/members/list/components/row.tsx":
/*!***********************************************!*\
  !*** ./pages/members/list/components/row.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Row = function Row(props) {
  return React.createElement("tr", null, React.createElement("td", null, React.createElement("img", {
    src: props.member.avatarUrl,
    style: {
      maxWidth: '10rem'
    }
  })), React.createElement("td", null, React.createElement("span", null, props.member.id)), React.createElement("td", null, React.createElement("span", null, props.member.name)));
};

exports.Row = Row;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Row, "Row", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\components\\row.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/components/table.tsx":
/*!*************************************************!*\
  !*** ./pages/members/list/components/table.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _header = __webpack_require__(/*! ./header */ "./pages/members/list/components/header.tsx");

var _body = __webpack_require__(/*! ./body */ "./pages/members/list/components/body.tsx");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Table = function Table(props) {
  return React.createElement("table", {
    className: "table table-striped"
  }, React.createElement(_header.Header, null), React.createElement(_body.Body, {
    members: props.members
  }));
};

exports.Table = Table;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Table, "Table", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\components\\table.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/index.ts":
/*!*************************************!*\
  !*** ./pages/members/list/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageContainer = __webpack_require__(/*! ./pageContainer */ "./pages/members/list/pageContainer.tsx");

Object.keys(_pageContainer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pageContainer[key];
    }
  });
});

var _reducers = __webpack_require__(/*! ./reducers */ "./pages/members/list/reducers/index.ts");

Object.keys(_reducers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reducers[key];
    }
  });
});

/***/ }),

/***/ "./pages/members/list/mappers.ts":
/*!***************************************!*\
  !*** ./pages/members/list/mappers.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMemberListModelToVM = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var mapMemberListModelToVM = function mapMemberListModelToVM(members) {
  return Array.isArray(members) ? members.map(mapMemberModelToVM) : [];
};

exports.mapMemberListModelToVM = mapMemberListModelToVM;

var mapMemberModelToVM = function mapMemberModelToVM(member) {
  return {
    id: member.id,
    name: member.login,
    avatarUrl: member.avatar_url
  };
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapMemberListModelToVM, "mapMemberListModelToVM", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\mappers.ts");
  reactHotLoader.register(mapMemberModelToVM, "mapMemberModelToVM", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\mappers.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/page.tsx":
/*!*************************************!*\
  !*** ./pages/members/list/page.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberListPage = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _components = __webpack_require__(/*! ./components */ "./pages/members/list/components/index.ts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var MemberListPage = function MemberListPage(props) {
  return React.createElement(React.Fragment, null, React.createElement("h2", null, "Members"), React.createElement(_components.Table, {
    members: props.members
  }));
};

exports.MemberListPage = MemberListPage;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MemberListPage, "MemberListPage", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\page.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/pageContainer.tsx":
/*!**********************************************!*\
  !*** ./pages/members/list/pageContainer.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberListPageContainer = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _page = __webpack_require__(/*! ./page */ "./pages/members/list/page.tsx");

var _member = __webpack_require__(/*! ../../../rest-api/api/member */ "./rest-api/api/member.ts");

var _selectors = __webpack_require__(/*! ./selectors */ "./pages/members/list/selectors.ts");

var _reactRedux = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var mapStateToProps = function mapStateToProps(state) {
  return {
    members: (0, _selectors.getMembersVM)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchMembers: function fetchMembers() {
      return dispatch((0, _member.fetchMembers)());
    }
  };
};

var PageContainer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PageContainer, _React$PureComponent);

  function PageContainer() {
    _classCallCheck(this, PageContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageContainer).apply(this, arguments));
  }

  _createClass(PageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.fetchMembers();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_page.MemberListPage, {
        members: this.props.members
      });
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return PageContainer;
}(React.PureComponent);

var MemberListPageContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PageContainer);
exports.MemberListPageContainer = MemberListPageContainer;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\pageContainer.tsx");
  reactHotLoader.register(mapDispatchToProps, "mapDispatchToProps", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\pageContainer.tsx");
  reactHotLoader.register(PageContainer, "PageContainer", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\pageContainer.tsx");
  reactHotLoader.register(MemberListPageContainer, "MemberListPageContainer", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\pageContainer.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/reducers/index.ts":
/*!**********************************************!*\
  !*** ./pages/members/list/reducers/index.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _members = __webpack_require__(/*! ./members */ "./pages/members/list/reducers/members.ts");

Object.keys(_members).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _members[key];
    }
  });
});

/***/ }),

/***/ "./pages/members/list/reducers/members.ts":
/*!************************************************!*\
  !*** ./pages/members/list/reducers/members.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.membersReducer = void 0;

var _actionIds = __webpack_require__(/*! ../actions/actionIds */ "./pages/members/list/actions/actionIds.ts");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var membersReducer = function membersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionIds.actionIds.UPDATE_MEMBERS:
      return handleUpdateMembers(state, action.payload);
  }

  return state;
};

exports.membersReducer = membersReducer;

var handleUpdateMembers = function handleUpdateMembers(state, members) {
  return members;
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(membersReducer, "membersReducer", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\reducers\\members.ts");
  reactHotLoader.register(handleUpdateMembers, "handleUpdateMembers", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\reducers\\members.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/members/list/selectors.ts":
/*!*****************************************!*\
  !*** ./pages/members/list/selectors.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMembersVM = exports.getMembers = void 0;

var _reselect = __webpack_require__(/*! reselect */ "../node_modules/reselect/es/index.js");

var _mappers = __webpack_require__(/*! ./mappers */ "./pages/members/list/mappers.ts");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var getMembers = function getMembers(state) {
  return state.members;
};

exports.getMembers = getMembers;
var getMembersVM = (0, _reselect.createSelector)(getMembers, function (members) {
  return (0, _mappers.mapMemberListModelToVM)(members);
});
exports.getMembersVM = getMembersVM;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getMembers, "getMembers", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\selectors.ts");
  reactHotLoader.register(getMembersVM, "getMembersVM", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\members\\list\\selectors.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./pages/reducers.ts":
/*!***************************!*\
  !*** ./pages/reducers.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducers = void 0;

var _redux = __webpack_require__(/*! redux */ "../node_modules/redux/es/redux.js");

var _login = __webpack_require__(/*! ./login */ "./pages/login/index.ts");

var _list = __webpack_require__(/*! ./members/list */ "./pages/members/list/index.ts");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var reducers = (0, _redux.combineReducers)({
  login: _login.loginReducer,
  members: _list.membersReducer
});
exports.reducers = reducers;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(reducers, "reducers", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\pages\\reducers.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./rest-api/api/login.ts":
/*!*******************************!*\
  !*** ./rest-api/api/login.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var login = function login(loginEntity) {
  return isValidLogin(loginEntity) ? Promise.resolve() : Promise.reject('Not valid login or password');
};

exports.login = login;

var isValidLogin = function isValidLogin(loginEntity) {
  return loginEntity.login === 'admin' && loginEntity.password === 'test';
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(login, "login", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\rest-api\\api\\login.ts");
  reactHotLoader.register(isValidLogin, "isValidLogin", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\rest-api\\api\\login.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./rest-api/api/member.ts":
/*!********************************!*\
  !*** ./rest-api/api/member.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMembers = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var baseUrl = 'https://api.github.com/orgs/lemoncode/members';

var fetchMembers = function fetchMembers() {
  return fetch(baseUrl).then(extractPayload);
};

exports.fetchMembers = fetchMembers;

var extractPayload = function extractPayload(response) {
  return response.ok ? response.json() : responseError(response);
};

var responseError = function responseError(response) {
  return response.json().then(function (error) {
    return Promise.reject(error.message);
  });
};

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(baseUrl, "baseUrl", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\rest-api\\api\\member.ts");
  reactHotLoader.register(fetchMembers, "fetchMembers", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\rest-api\\api\\member.ts");
  reactHotLoader.register(extractPayload, "extractPayload", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\rest-api\\api\\member.ts");
  reactHotLoader.register(responseError, "responseError", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\rest-api\\api\\member.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./routes.tsx":
/*!********************!*\
  !*** ./routes.tsx ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;

var React = _interopRequireWildcard(__webpack_require__(/*! react */ "../node_modules/react/index.js"));

var _reactRouter = __webpack_require__(/*! react-router */ "../node_modules/react-router/es/index.js");

var _routes = __webpack_require__(/*! ./common/constants/routes */ "./common/constants/routes/index.ts");

var _app = __webpack_require__(/*! ./app */ "./app.tsx");

var _pages = __webpack_require__(/*! ./pages */ "./pages/index.ts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var Routes = function Routes() {
  return React.createElement(_app.App, null, React.createElement(_reactRouter.Switch, null, React.createElement(_reactRouter.Route, {
    exact: true,
    path: _routes.routes.default,
    component: _pages.LoginPageContainer
  }), React.createElement(_reactRouter.Route, {
    path: _routes.routes.members,
    component: _pages.MemberListPageContainer
  })));
};

exports.Routes = Routes;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Routes, "Routes", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\routes.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./store.ts":
/*!******************!*\
  !*** ./store.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = __webpack_require__(/*! redux */ "../node_modules/redux/es/redux.js");

var _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ "../node_modules/redux-thunk/es/index.js"));

var _pages = __webpack_require__(/*! ./pages */ "./pages/index.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var nonTypedWindow = window;
var composeEnhancers = nonTypedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = (0, _redux.createStore)(_pages.reducers, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk.default)));
exports.store = store;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(nonTypedWindow, "nonTypedWindow", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\store.ts");
  reactHotLoader.register(composeEnhancers, "composeEnhancers", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\store.ts");
  reactHotLoader.register(store, "store", "D:\\Proyectos\\Lemoncode\\Testing\\ejercicio-jest-testing\\src\\store.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "../node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./index.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.tsx */"./index.tsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzeCIsIndlYnBhY2s6Ly8vLi9hcHBQcm92aWRlci50c3giLCJ3ZWJwYWNrOi8vLy4vYXBwUm91dGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9mb3JtL2J1dHRvbi50c3giLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL2NvbXBvbmVudHMvZm9ybS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9mb3JtL2lucHV0LnRzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9wYW5lbC9jb21wb25lbnRzL2JvZHkudHN4Iiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL3BhbmVsL2NvbXBvbmVudHMvaGVhZGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29tcG9uZW50cy9wYW5lbC9jb21wb25lbnRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL3BhbmVsL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbW1vbi9jb21wb25lbnRzL3BhbmVsL3BhbmVsLnRzeCIsIndlYnBhY2s6Ly8vLi9jb21tb24vY29uc3RhbnRzL3JvdXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9oaXN0b3J5LnRzIiwid2VicGFjazovLy8uL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9sb2dpbi9hY3Rpb25zL2FjdGlvbklkcy50cyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9sb2dpbi9hY3Rpb25zL2xvZ2luUmVxdWVzdC50cyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9sb2dpbi9hY3Rpb25zL3VwZGF0ZUxvZ2luRW50aXR5RmllbGQudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vY29tcG9uZW50cy9mb3JtLnRzeCIsIndlYnBhY2s6Ly8vLi9wYWdlcy9sb2dpbi9jb21wb25lbnRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3BhZ2VzL2xvZ2luL2luZGV4LnRzIiwid2VicGFjazovLy8uL3BhZ2VzL2xvZ2luL21hcHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vcGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vcGFnZUNvbnRhaW5lci50c3giLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vcmVkdWNlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vcmVkdWNlcnMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vdmFsaWRhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4vdmlld01vZGVsLnRzIiwid2VicGFjazovLy8uL3BhZ2VzL21lbWJlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L2FjdGlvbnMvYWN0aW9uSWRzLnRzIiwid2VicGFjazovLy8uL3BhZ2VzL21lbWJlcnMvbGlzdC9jb21wb25lbnRzL2JvZHkudHN4Iiwid2VicGFjazovLy8uL3BhZ2VzL21lbWJlcnMvbGlzdC9jb21wb25lbnRzL2hlYWRlci50c3giLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L2NvbXBvbmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L2NvbXBvbmVudHMvcm93LnRzeCIsIndlYnBhY2s6Ly8vLi9wYWdlcy9tZW1iZXJzL2xpc3QvY29tcG9uZW50cy90YWJsZS50c3giLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L21hcHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L3BhZ2UudHN4Iiwid2VicGFjazovLy8uL3BhZ2VzL21lbWJlcnMvbGlzdC9wYWdlQ29udGFpbmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9wYWdlcy9tZW1iZXJzL2xpc3QvcmVkdWNlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L3JlZHVjZXJzL21lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvbWVtYmVycy9saXN0L3NlbGVjdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9yZWR1Y2Vycy50cyIsIndlYnBhY2s6Ly8vLi9yZXN0LWFwaS9hcGkvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vcmVzdC1hcGkvYXBpL21lbWJlci50cyIsIndlYnBhY2s6Ly8vLi9yb3V0ZXMudHN4Iiwid2VicGFjazovLy8uL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNB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RUFDRSxvQkFBQyxrQkFBRCxFQUFNO0FBQ0osU0FBSyxFQUFFLElBREg7QUFFSixRQUFJLEVBQUUsZUFBTyxPQUZUO0FBR0osYUFBUyxFQUFFO0FBSFAsR0FBTixDQURGLEVBTUUsb0JBQUMsa0JBQUQsRUFBTTtBQUFDLFFBQUksRUFBRSxlQUFPLE9BQWQ7QUFBdUIsYUFBUyxFQUFFO0FBQWxDLEdBQU4sQ0FORixDQURGLENBRG9CO0FBQUEsQ0FBZjs7Ozs7Ozs7Ozs7OzBCQUFNLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOYjs7QUFDQTs7QUFDQTs7Ozs7Ozs7O0FBRUEsSUFBTSxjQUFjLEdBQVEsTUFBNUI7QUFDQSxJQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxvQ0FBZixJQUF1RCxjQUFoRjtBQUVPLElBQU0sS0FBSyxHQUFHLHdCQUNuQixlQURtQixFQUVuQixnQkFBZ0IsQ0FBQyw0QkFBZ0IsbUJBQWhCLENBQUQsQ0FGRyxDQUFkOzs7Ozs7Ozs7OzswQkFIRCxjOzBCQUNBLGdCOzBCQUVPLEsiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZGMwZTllNTMyMDM4YWU3N2RlZTZcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwcDogUmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50ID0gKHByb3BzKSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgIHtwcm9wcy5jaGlsZHJlbn1cclxuICA8L2Rpdj5cclxuKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEFwcFJvdXRlciB9IGZyb20gJy4vYXBwUm91dGVyJztcclxuXHJcbmNvbnN0IEFwcFByb3ZpZGVyOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQgPSAocHJvcHMpID0+IChcclxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgIDxBcHBSb3V0ZXIgLz5cclxuICA8L1Byb3ZpZGVyPlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG90KG1vZHVsZSkoQXBwUHJvdmlkZXIpO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcbmltcG9ydCB7IGhpc3RvcnkgfSBmcm9tICcuL2hpc3RvcnknO1xyXG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQXBwUm91dGVyOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQgPSAoKSA9PiAoXHJcbiAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cclxuICAgIDxSb3V0ZXMgLz5cclxuICA8L1JvdXRlcj5cclxuKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHR5cGU/OiBzdHJpbmc7XHJcbiAgb25DbGljazogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEJ1dHRvbjogUmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50PFByb3BzPiA9IChwcm9wcykgPT4gKFxyXG4gIDxidXR0b25cclxuICAgIHR5cGU9e3Byb3BzLnR5cGV9XHJcbiAgICBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1zdWNjZXNzIGJ0bi1ibG9ja1wiXHJcbiAgICBvbkNsaWNrPXtvbkNsaWNrKHByb3BzKX1cclxuICA+XHJcbiAgICB7cHJvcHMubGFiZWx9XHJcbiAgPC9idXR0b24+XHJcbik7XHJcblxyXG5CdXR0b24uZGVmYXVsdFByb3BzID0ge1xyXG4gIHR5cGU6ICdzdWJtaXQnLFxyXG59O1xyXG5cclxuY29uc3Qgb25DbGljayA9IChwcm9wczogUHJvcHMpID0+IChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBwcm9wcy5vbkNsaWNrKCk7XHJcbn07XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vYnV0dG9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnB1dCc7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6IGFueTtcclxuICBvbkJsdXI/OiBhbnk7XHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBlcnJvcj86IHN0cmluZztcclxuICB0eXBlPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSW5wdXQ6IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudDxQcm9wcz4gPSAocHJvcHMpID0+IChcclxuICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgIDxsYWJlbCBodG1sRm9yPXtwcm9wcy5uYW1lfT57cHJvcHMubGFiZWx9PC9sYWJlbD5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmllbGRcIj5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgdHlwZT17cHJvcHMudHlwZX1cclxuICAgICAgICBuYW1lPXtwcm9wcy5uYW1lfVxyXG4gICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2J1aWxkRXJyb3JDbGFzcyhwcm9wcy5lcnJvcil9YH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17cHJvcHMucGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgdmFsdWU9e3Byb3BzLnZhbHVlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZShwcm9wcyl9XHJcbiAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XHJcbiAgICAgIC8+XHJcbiAgICAgIHtcclxuICAgICAgICBCb29sZWFuKHByb3BzLmVycm9yKSAmJlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW52YWxpZC1mZWVkYmFja1wiPlxyXG4gICAgICAgICAge3Byb3BzLmVycm9yfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICB9XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IGJ1aWxkRXJyb3JDbGFzcyA9IChlcnJvcjogc3RyaW5nKTogc3RyaW5nID0+IChcclxuICBCb29sZWFuKGVycm9yKSA/XHJcbiAgICAnaXMtaW52YWxpZCcgOlxyXG4gICAgJydcclxuKTtcclxuXHJcbmNvbnN0IG9uQ2hhbmdlID0gKHByb3BzOiBQcm9wcykgPT4gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgcHJvcHMub25DaGFuZ2UoZS50YXJnZXQubmFtZSwgZS50YXJnZXQudmFsdWUpO1xyXG59O1xyXG5cclxuSW5wdXQuZGVmYXVsdFByb3BzID0ge1xyXG4gIHR5cGU6ICd0ZXh0JyxcclxufTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEJvZHk6IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudCA9IChwcm9wcykgPT4gKFxyXG4gIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cclxuICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuICAgICAge3Byb3BzLmNoaWxkcmVufVxyXG4gICAgPC9saT5cclxuICA8L3VsPlxyXG4pO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBIZWFkZXIgPSAocHJvcHM6IFByb3BzKSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgPGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+e3Byb3BzLnRpdGxlfTwvaDM+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vYm9keSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaGVhZGVyJztcclxuIiwiZXhwb3J0ICogZnJvbSAnLi9wYW5lbCc7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm9keSwgSGVhZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBhbmVsOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8UHJvcHM+ID0gKHByb3BzKSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XHJcbiAgICA8SGVhZGVyIHRpdGxlPXtwcm9wcy50aXRsZX0gLz5cclxuICAgIDxCb2R5PlxyXG4gICAgICB7cHJvcHMuY2hpbGRyZW59XHJcbiAgICA8L0JvZHk+XHJcbiAgPC9kaXY+XHJcbik7XHJcbiIsImV4cG9ydCBjb25zdCByb3V0ZXMgPSB7XHJcbiAgZGVmYXVsdDogJy8nLFxyXG4gIG1lbWJlcnM6ICcvbWVtYmVycycsXHJcbn07XHJcbiIsImltcG9ydCB7IGNyZWF0ZUhhc2hIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGlzdG9yeSA9IGNyZWF0ZUhhc2hIaXN0b3J5KCk7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEFwcFByb3ZpZGVyIGZyb20gJy4vYXBwUHJvdmlkZXInO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHBQcm92aWRlciAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vbG9naW4nO1xyXG5leHBvcnQgKiBmcm9tICcuL21lbWJlcnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3JlZHVjZXJzJztcclxuIiwiZXhwb3J0IGNvbnN0IGFjdGlvbklkcyA9IHtcclxuICBVUERBVEVfTE9HSU5fRU5USVRZX0ZJRUxEOiAnVVBEQVRFX0xPR0lOX0VOVElUWV9GSUVMRCcsXHJcbiAgVVBEQVRFX0xPR0lOX0ZPUk1fRVJST1JTOiAnVVBEQVRFX0xPR0lOX0ZPUk1fRVJST1JTJyxcclxufTtcclxuIiwiaW1wb3J0IHsgRmllbGRWYWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnbGMtZm9ybS12YWxpZGF0aW9uJztcclxuaW1wb3J0IHsgdmFsaWRhdGlvbnMgfSBmcm9tICcuLi92YWxpZGF0aW9ucyc7XHJcbmltcG9ydCB7IExvZ2luRW50aXR5IH0gZnJvbSAnLi4vdmlld01vZGVsJztcclxuaW1wb3J0IHsgbWFwTG9naW5FbnRpdHlWTVRvTW9kZWwgfSBmcm9tICcuLi9tYXBwZXJzJztcclxuaW1wb3J0IHsgbG9naW4gfSBmcm9tICcuLi8uLi8uLi9yZXN0LWFwaS9hcGkvbG9naW4nO1xyXG5pbXBvcnQgeyBoaXN0b3J5IH0gZnJvbSAnLi4vLi4vLi4vaGlzdG9yeSc7XHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb25zdGFudHMvcm91dGVzJztcclxuaW1wb3J0IHsgYWN0aW9uSWRzIH0gZnJvbSAnLi9hY3Rpb25JZHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luUmVxdWVzdCA9IChsb2dpbkVudGl0eTogTG9naW5FbnRpdHkpID0+IChkaXNwYXRjaCkgPT4gKFxyXG4gIHZhbGlkYXRpb25zLnZhbGlkYXRlRm9ybShsb2dpbkVudGl0eSlcclxuICAgIC50aGVuKChmb3JtVmFsaWRhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICBmb3JtVmFsaWRhdGlvblJlc3VsdC5zdWNjZWVkZWQgP1xyXG4gICAgICAgIGRvTG9naW4obG9naW5FbnRpdHkpIDpcclxuICAgICAgICBkaXNwYXRjaCh1cGRhdGVMb2dpbkZvcm1FcnJvcnMoZm9ybVZhbGlkYXRpb25SZXN1bHQuZmllbGRFcnJvcnMpKTtcclxuICAgIH0pXHJcbik7XHJcblxyXG5jb25zdCBkb0xvZ2luID0gKGxvZ2luRW50aXR5OiBMb2dpbkVudGl0eSkgPT4ge1xyXG4gIGNvbnN0IGxvZ2luRW50aXR5TW9kZWwgPSBtYXBMb2dpbkVudGl0eVZNVG9Nb2RlbChsb2dpbkVudGl0eSk7XHJcbiAgbG9naW4obG9naW5FbnRpdHlNb2RlbClcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgaGlzdG9yeS5wdXNoKHJvdXRlcy5tZW1iZXJzKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goY29uc29sZS5sb2cpO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlTG9naW5Gb3JtRXJyb3JzID0gKGZpZWxkRXJyb3JzOiB7IFtrZXk6IHN0cmluZ106IEZpZWxkVmFsaWRhdGlvblJlc3VsdCB9KSA9PiAoe1xyXG4gIHR5cGU6IGFjdGlvbklkcy5VUERBVEVfTE9HSU5fRk9STV9FUlJPUlMsXHJcbiAgcGF5bG9hZDogZmllbGRFcnJvcnMsXHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBGaWVsZFZhbGlkYXRpb25SZXN1bHQgfSBmcm9tICdsYy1mb3JtLXZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBhY3Rpb25JZHMgfSBmcm9tICcuL2FjdGlvbklkcyc7XHJcbmltcG9ydCB7IHZhbGlkYXRpb25zIH0gZnJvbSAnLi4vdmFsaWRhdGlvbnMnO1xyXG5pbXBvcnQgeyBMb2dpbkVudGl0eSB9IGZyb20gJy4uL3ZpZXdNb2RlbCc7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlTG9naW5FbnRpdHlGaWVsZCA9IChsb2dpbkVudGl0eTogTG9naW5FbnRpdHksIGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiAoZGlzcGF0Y2gpID0+XHJcbiAgdmFsaWRhdGlvbnMudmFsaWRhdGVGaWVsZChsb2dpbkVudGl0eSwgZmllbGROYW1lLCB2YWx1ZSlcclxuICAgIC50aGVuKChmaWVsZFZhbGlkYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgZGlzcGF0Y2godXBkYXRlTG9naW5FbnRpdHlGaWVsZENvbXBsZXRlZChmaWVsZE5hbWUsIHZhbHVlLCBmaWVsZFZhbGlkYXRpb25SZXN1bHQpKTtcclxuICAgIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUxvZ2luRW50aXR5RmllbGRDb21wbGV0ZWQgPVxyXG4gIChmaWVsZE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSwgZmllbGRWYWxpZGF0aW9uUmVzdWx0OiBGaWVsZFZhbGlkYXRpb25SZXN1bHQpID0+ICh7XHJcbiAgICB0eXBlOiBhY3Rpb25JZHMuVVBEQVRFX0xPR0lOX0VOVElUWV9GSUVMRCxcclxuICAgIHBheWxvYWQ6IHtcclxuICAgICAgZmllbGROYW1lLFxyXG4gICAgICB2YWx1ZSxcclxuICAgICAgZmllbGRWYWxpZGF0aW9uUmVzdWx0LFxyXG4gICAgfSxcclxuICB9KTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtUHJvcHMgfSBmcm9tICcuL2Zvcm1Qcm9wcyc7XHJcbmltcG9ydCB7IElucHV0LCBCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50cy9mb3JtJztcclxuXHJcbmV4cG9ydCBjb25zdCBGb3JtOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8Rm9ybVByb3BzPiA9IChwcm9wcykgPT4gKFxyXG4gIDxmb3JtIHJvbGU9XCJmb3JtXCI+XHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICAgIDxJbnB1dFxyXG4gICAgICAgIG5hbWU9XCJsb2dpblwiXHJcbiAgICAgICAgbGFiZWw9XCJMb2dpblwiXHJcbiAgICAgICAgb25DaGFuZ2U9e3Byb3BzLnVwZGF0ZUZpZWxkfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRS1tYWlsXCJcclxuICAgICAgICB2YWx1ZT17cHJvcHMubG9naW5FbnRpdHkubG9naW59XHJcbiAgICAgICAgZXJyb3I9e3Byb3BzLmxvZ2luRm9ybUVycm9ycy5sb2dpbi5lcnJvck1lc3NhZ2V9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxJbnB1dFxyXG4gICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcclxuICAgICAgICBsYWJlbD1cIlBhc3N3b3JkXCJcclxuICAgICAgICBvbkNoYW5nZT17cHJvcHMudXBkYXRlRmllbGR9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgdmFsdWU9e3Byb3BzLmxvZ2luRW50aXR5LnBhc3N3b3JkfVxyXG4gICAgICAgIGVycm9yPXtwcm9wcy5sb2dpbkZvcm1FcnJvcnMucGFzc3dvcmQuZXJyb3JNZXNzYWdlfVxyXG4gICAgICAvPlxyXG4gICAgICA8QnV0dG9uXHJcbiAgICAgICAgb25DbGljaz17cHJvcHMuZG9Mb2dpbn1cclxuICAgICAgICBsYWJlbD1cIkxvZ2luXCJcclxuICAgICAgLz5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgPC9mb3JtPlxyXG4pO1xyXG4iLCJleHBvcnQgKiBmcm9tICcuL2Zvcm0nO1xyXG5leHBvcnQgKiBmcm9tICcuL2Zvcm1Qcm9wcyc7XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vcGFnZUNvbnRhaW5lcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vcmVkdWNlcnMnO1xyXG4iLCJpbXBvcnQgKiBhcyBtb2RlbCBmcm9tICcuLi8uLi9yZXN0LWFwaS9tb2RlbCc7XHJcbmltcG9ydCAqIGFzIHZtIGZyb20gJy4vdmlld01vZGVsJztcclxuXHJcbmV4cG9ydCBjb25zdCBtYXBMb2dpbkVudGl0eVZNVG9Nb2RlbCA9IChsb2dpbkVudGl0eTogdm0uTG9naW5FbnRpdHkpOiBtb2RlbC5Mb2dpbkVudGl0eSA9PiAoXHJcbiAgQm9vbGVhbihsb2dpbkVudGl0eSkgP1xyXG4gIHtcclxuICAgIC4uLmxvZ2luRW50aXR5LFxyXG4gIH0gOlxyXG4gIG51bGxcclxuKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb21wb25lbnRzL3BhbmVsJztcclxuaW1wb3J0IHsgRm9ybSwgRm9ybVByb3BzIH0gZnJvbSAnLi9jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBMb2dpblBhZ2U6IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudDxGb3JtUHJvcHM+ID0gKHByb3BzKSA9PiAoXHJcbiAgPFBhbmVsIHRpdGxlPVwiUGxlYXNlIHNpZ24gaW5cIj5cclxuICAgIDxGb3JtXHJcbiAgICAgIHsuLi5wcm9wc31cclxuICAgIC8+XHJcbiAgPC9QYW5lbD5cclxuKTtcclxuIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi9yZWR1Y2Vycyc7XHJcbmltcG9ydCB7IHVwZGF0ZUxvZ2luRW50aXR5RmllbGQgfSBmcm9tICcuL2FjdGlvbnMvdXBkYXRlTG9naW5FbnRpdHlGaWVsZCc7XHJcbmltcG9ydCB7IGxvZ2luUmVxdWVzdCB9IGZyb20gJy4vYWN0aW9ucy9sb2dpblJlcXVlc3QnO1xyXG5pbXBvcnQgeyBMb2dpbkVudGl0eSB9IGZyb20gJy4vdmlld01vZGVsJztcclxuaW1wb3J0IHsgTG9naW5QYWdlIH0gZnJvbSAnLi9wYWdlJztcclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGUpID0+ICh7XHJcbiAgbG9naW5FbnRpdHk6IHN0YXRlLmxvZ2luLmxvZ2luRW50aXR5LFxyXG4gIGxvZ2luRm9ybUVycm9yczogc3RhdGUubG9naW4ubG9naW5Gb3JtRXJyb3JzLFxyXG59KTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCkgPT4gKHtcclxuICB1cGRhdGVGaWVsZDogKGxvZ2luRW50aXR5OiBMb2dpbkVudGl0eSkgPT4gKGZpZWxkTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiBkaXNwYXRjaChcclxuICAgIHVwZGF0ZUxvZ2luRW50aXR5RmllbGQobG9naW5FbnRpdHksIGZpZWxkTmFtZSwgdmFsdWUpXHJcbiAgKSxcclxuICBkb0xvZ2luOiAobG9naW5FbnRpdHk6IExvZ2luRW50aXR5KSA9PiAoKSA9PiBkaXNwYXRjaChsb2dpblJlcXVlc3QobG9naW5FbnRpdHkpKSxcclxufSk7XHJcblxyXG5jb25zdCBtZXJnZVByb3BzID0gKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSA9PiAoe1xyXG4gIC4uLm93blByb3BzLFxyXG4gIC4uLnN0YXRlUHJvcHMsXHJcbiAgdXBkYXRlRmllbGQ6IGRpc3BhdGNoUHJvcHMudXBkYXRlRmllbGQoc3RhdGVQcm9wcy5sb2dpbkVudGl0eSksXHJcbiAgZG9Mb2dpbjogZGlzcGF0Y2hQcm9wcy5kb0xvZ2luKHN0YXRlUHJvcHMubG9naW5FbnRpdHkpLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBMb2dpblBhZ2VDb250YWluZXIgPSBjb25uZWN0KFxyXG4gIG1hcFN0YXRlVG9Qcm9wcyxcclxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXHJcbiAgbWVyZ2VQcm9wc1xyXG4pKExvZ2luUGFnZSk7XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vbG9naW4nO1xyXG4iLCJpbXBvcnQgeyBhY3Rpb25JZHMgfSBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbklkcyc7XHJcbmltcG9ydCB7XHJcbiAgTG9naW5FbnRpdHksIGNyZWF0ZUVtcHR5TG9naW5FbnRpdHksXHJcbiAgTG9naW5Gb3JtRXJyb3JzLCBjcmVhdGVFbXB0eUxvZ2luRm9ybUVycm9ycyxcclxufSBmcm9tICcuLi92aWV3TW9kZWwnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dpblN0YXRlIHtcclxuICBsb2dpbkVudGl0eTogTG9naW5FbnRpdHk7XHJcbiAgbG9naW5Gb3JtRXJyb3JzOiBMb2dpbkZvcm1FcnJvcnM7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUVtcHR5U3RhdGUgPSAoKTogTG9naW5TdGF0ZSA9PiAoe1xyXG4gIGxvZ2luRW50aXR5OiBjcmVhdGVFbXB0eUxvZ2luRW50aXR5KCksXHJcbiAgbG9naW5Gb3JtRXJyb3JzOiBjcmVhdGVFbXB0eUxvZ2luRm9ybUVycm9ycygpLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dpblJlZHVjZXIgPSAoc3RhdGUgPSBjcmVhdGVFbXB0eVN0YXRlKCksIGFjdGlvbikgPT4ge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgYWN0aW9uSWRzLlVQREFURV9MT0dJTl9FTlRJVFlfRklFTEQ6XHJcbiAgICAgIHJldHVybiBoYW5kbGVVcGRhdGVMb2dpbkVudGl0eUZpZWxkKHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XHJcblxyXG4gICAgY2FzZSBhY3Rpb25JZHMuVVBEQVRFX0xPR0lOX0ZPUk1fRVJST1JTOlxyXG4gICAgICByZXR1cm4gaGFuZGxlVXBkYXRlTG9naW5Gb3JtRXJyb3JzKHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RhdGU7XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVVcGRhdGVMb2dpbkVudGl0eUZpZWxkID0gKHN0YXRlOiBMb2dpblN0YXRlLCB7IGZpZWxkTmFtZSwgdmFsdWUsIGZpZWxkVmFsaWRhdGlvblJlc3VsdCB9KTogTG9naW5TdGF0ZSA9PiAoe1xyXG4gIGxvZ2luRW50aXR5OiB7XHJcbiAgICAuLi5zdGF0ZS5sb2dpbkVudGl0eSxcclxuICAgIFtmaWVsZE5hbWVdOiB2YWx1ZSxcclxuICB9LFxyXG4gIGxvZ2luRm9ybUVycm9yczoge1xyXG4gICAgLi4uc3RhdGUubG9naW5Gb3JtRXJyb3JzLFxyXG4gICAgW2ZpZWxkTmFtZV06IGZpZWxkVmFsaWRhdGlvblJlc3VsdCxcclxuICB9LFxyXG59KTtcclxuXHJcbmNvbnN0IGhhbmRsZVVwZGF0ZUxvZ2luRm9ybUVycm9ycyA9IChzdGF0ZTogTG9naW5TdGF0ZSwgbG9naW5Gb3JtRXJyb3JzOiBMb2dpbkZvcm1FcnJvcnMpOiBMb2dpblN0YXRlID0+ICh7XHJcbiAgLi4uc3RhdGUsXHJcbiAgbG9naW5Gb3JtRXJyb3JzLFxyXG59KTtcclxuIiwiaW1wb3J0IHsgY3JlYXRlRm9ybVZhbGlkYXRpb24sIFZhbGlkYXRpb25Db25zdHJhaW50cywgVmFsaWRhdG9ycyB9IGZyb20gJ2xjLWZvcm0tdmFsaWRhdGlvbic7XHJcblxyXG5jb25zdCB2YWxpZGF0aW9uQ29uc3RyYWludHM6IFZhbGlkYXRpb25Db25zdHJhaW50cyA9IHtcclxuICBmaWVsZHM6IHtcclxuICAgIGxvZ2luOiBbXHJcbiAgICAgIHsgdmFsaWRhdG9yOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0sXHJcbiAgICBdLFxyXG4gICAgcGFzc3dvcmQ6IFtcclxuICAgICAgeyB2YWxpZGF0b3I6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSxcclxuICAgIF0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9ucyA9IGNyZWF0ZUZvcm1WYWxpZGF0aW9uKHZhbGlkYXRpb25Db25zdHJhaW50cyk7XHJcbiIsImltcG9ydCB7IEZpZWxkVmFsaWRhdGlvblJlc3VsdCB9IGZyb20gJ2xjLWZvcm0tdmFsaWRhdGlvbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luRW50aXR5IHtcclxuICBsb2dpbjogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFbXB0eUxvZ2luRW50aXR5ID0gKCk6IExvZ2luRW50aXR5ID0+ICh7XHJcbiAgbG9naW46ICcnLFxyXG4gIHBhc3N3b3JkOiAnJyxcclxufSk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luRm9ybUVycm9ycyB7XHJcbiAgbG9naW46IEZpZWxkVmFsaWRhdGlvblJlc3VsdDtcclxuICBwYXNzd29yZDogRmllbGRWYWxpZGF0aW9uUmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlRW1wdHlMb2dpbkZvcm1FcnJvcnMgPSAoKTogTG9naW5Gb3JtRXJyb3JzID0+ICh7XHJcbiAgbG9naW46IG5ldyBGaWVsZFZhbGlkYXRpb25SZXN1bHQoKSxcclxuICBwYXNzd29yZDogbmV3IEZpZWxkVmFsaWRhdGlvblJlc3VsdCgpLFxyXG59KTtcclxuIiwiZXhwb3J0ICogZnJvbSAnLi9saXN0JztcclxuIiwiZXhwb3J0IGNvbnN0IGFjdGlvbklkcyA9IHtcclxuICBVUERBVEVfTUVNQkVSUzogJ1VQREFURV9NRU1CRVJTJyxcclxufTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNZW1iZXIgfSBmcm9tICcuLi92aWV3TW9kZWwnO1xyXG5pbXBvcnQgeyBSb3cgfSBmcm9tICcuL3Jvdyc7XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIG1lbWJlcnM6IE1lbWJlcltdO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQm9keTogUmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50PFByb3BzPiA9IChwcm9wcykgPT4gKFxyXG4gIDx0Ym9keT5cclxuICAgIHtcclxuICAgICAgcHJvcHMubWVtYmVycy5tYXAoKG1lbWJlcikgPT4gKFxyXG4gICAgICAgIDxSb3dcclxuICAgICAgICAgIGtleT17bWVtYmVyLmlkfVxyXG4gICAgICAgICAgbWVtYmVyPXttZW1iZXJ9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSlcclxuICAgIH1cclxuICA8L3Rib2R5PlxyXG4pO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY29uc3QgSGVhZGVyOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQgPSAocHJvcHMpID0+IChcclxuICA8dGhlYWQ+XHJcbiAgICA8dHI+XHJcbiAgICAgIDx0aD5cclxuICAgICAgICBBdmF0YXJcclxuICAgICAgPC90aD5cclxuICAgICAgPHRoPlxyXG4gICAgICAgIElkXHJcbiAgICAgIDwvdGg+XHJcbiAgICAgIDx0aD5cclxuICAgICAgICBOYW1lXHJcbiAgICAgIDwvdGg+XHJcbiAgICA8L3RyPlxyXG4gIDwvdGhlYWQ+XHJcbik7XHJcbiIsImV4cG9ydCAqIGZyb20gJy4vdGFibGUnO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE1lbWJlciB9IGZyb20gJy4uL3ZpZXdNb2RlbCc7XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIG1lbWJlcjogTWVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUm93OiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8UHJvcHM+ID0gKHByb3BzKSA9PiAoXHJcbiAgPHRyPlxyXG4gICAgPHRkPlxyXG4gICAgICA8aW1nIHNyYz17cHJvcHMubWVtYmVyLmF2YXRhclVybH0gc3R5bGU9e3sgbWF4V2lkdGg6ICcxMHJlbScgfX0gLz5cclxuICAgIDwvdGQ+XHJcbiAgICA8dGQ+XHJcbiAgICAgIDxzcGFuPntwcm9wcy5tZW1iZXIuaWR9PC9zcGFuPlxyXG4gICAgPC90ZD5cclxuICAgIDx0ZD5cclxuICAgICAgPHNwYW4+e3Byb3BzLm1lbWJlci5uYW1lfTwvc3Bhbj5cclxuICAgIDwvdGQ+XHJcbiAgPC90cj5cclxuKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNZW1iZXIgfSBmcm9tICcuLi92aWV3TW9kZWwnO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICcuL2hlYWRlcic7XHJcbmltcG9ydCB7IEJvZHkgfSBmcm9tICcuL2JvZHknO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBtZW1iZXJzOiBNZW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRhYmxlOiBSZWFjdC5TdGF0ZWxlc3NDb21wb25lbnQ8UHJvcHM+ID0gKHByb3BzKSA9PiAoXHJcbiAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj5cclxuICAgIDxIZWFkZXIgLz5cclxuICAgIDxCb2R5IG1lbWJlcnM9e3Byb3BzLm1lbWJlcnN9IC8+XHJcbiAgPC90YWJsZT5cclxuKTtcclxuIiwiaW1wb3J0ICogYXMgbW9kZWwgZnJvbSAnLi4vLi4vLi4vcmVzdC1hcGkvbW9kZWwnO1xyXG5pbXBvcnQgKiBhcyB2bSBmcm9tICcuL3ZpZXdNb2RlbCc7XHJcblxyXG5leHBvcnQgY29uc3QgbWFwTWVtYmVyTGlzdE1vZGVsVG9WTSA9IChtZW1iZXJzOiBtb2RlbC5NZW1iZXJbXSk6IHZtLk1lbWJlcltdID0+IChcclxuICBBcnJheS5pc0FycmF5KG1lbWJlcnMpID8gbWVtYmVycy5tYXAobWFwTWVtYmVyTW9kZWxUb1ZNKSA6IFtdXHJcbik7XHJcblxyXG5jb25zdCBtYXBNZW1iZXJNb2RlbFRvVk0gPSAobWVtYmVyOiBtb2RlbC5NZW1iZXIpOiB2bS5NZW1iZXIgPT4gKHtcclxuICBpZDogbWVtYmVyLmlkLFxyXG4gIG5hbWU6IG1lbWJlci5sb2dpbixcclxuICBhdmF0YXJVcmw6IG1lbWJlci5hdmF0YXJfdXJsLFxyXG59KTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBNZW1iZXIgfSBmcm9tICcuL3ZpZXdNb2RlbCc7XHJcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSAnLi9jb21wb25lbnRzJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgbWVtYmVyczogTWVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNZW1iZXJMaXN0UGFnZTogUmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50PFByb3BzPiA9IChwcm9wcykgPT4gKFxyXG4gIDw+XHJcbiAgICA8aDI+TWVtYmVyczwvaDI+XHJcbiAgICA8VGFibGVcclxuICAgICAgbWVtYmVycz17cHJvcHMubWVtYmVyc31cclxuICAgIC8+XHJcbiAgPC8+XHJcbik7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTWVtYmVyTGlzdFBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xyXG5pbXBvcnQgeyBNZW1iZXIgfSBmcm9tICcuL3ZpZXdNb2RlbCc7XHJcbmltcG9ydCB7IGZldGNoTWVtYmVycyB9IGZyb20gJy4uLy4uLy4uL3Jlc3QtYXBpL2FwaS9tZW1iZXInO1xyXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gJy4uLy4uL3JlZHVjZXJzJztcclxuaW1wb3J0IHsgZ2V0TWVtYmVyc1ZNIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZSkgPT4gKHtcclxuICBtZW1iZXJzOiBnZXRNZW1iZXJzVk0oc3RhdGUpLFxyXG59KTtcclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiAoe1xyXG4gIGZldGNoTWVtYmVyczogKCkgPT4gZGlzcGF0Y2goZmV0Y2hNZW1iZXJzKCkpLFxyXG59KTtcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgbWVtYmVyczogTWVtYmVyW107XHJcbiAgZmV0Y2hNZW1iZXJzOiAoKSA9PiB2b2lkO1xyXG59XHJcbmNsYXNzIFBhZ2VDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFByb3BzLCB7fT4ge1xyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5wcm9wcy5mZXRjaE1lbWJlcnMoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxNZW1iZXJMaXN0UGFnZVxyXG4gICAgICAgIG1lbWJlcnM9e3RoaXMucHJvcHMubWVtYmVyc31cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBNZW1iZXJMaXN0UGFnZUNvbnRhaW5lciA9IGNvbm5lY3QoXHJcbiAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFBhZ2VDb250YWluZXIpO1xyXG4iLCJleHBvcnQgKiBmcm9tICcuL21lbWJlcnMnO1xyXG4iLCJpbXBvcnQgeyBhY3Rpb25JZHMgfSBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbklkcyc7XHJcbmltcG9ydCB7IE1lbWJlciB9IGZyb20gJy4uLy4uLy4uLy4uL3Jlc3QtYXBpL21vZGVsJztcclxuXHJcbmV4cG9ydCB0eXBlIE1lbWJlcnNTdGF0ZSA9IE1lbWJlcltdO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lbWJlcnNSZWR1Y2VyID0gKHN0YXRlID0gW10sIGFjdGlvbik6IE1lbWJlcnNTdGF0ZSA9PiB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBhY3Rpb25JZHMuVVBEQVRFX01FTUJFUlM6XHJcbiAgICAgIHJldHVybiBoYW5kbGVVcGRhdGVNZW1iZXJzKHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgfVxyXG4gIHJldHVybiBzdGF0ZTtcclxufTtcclxuY29uc3QgaGFuZGxlVXBkYXRlTWVtYmVycyA9IChzdGF0ZTogTWVtYmVyc1N0YXRlLCBtZW1iZXJzOiBNZW1iZXJbXSk6IE1lbWJlcnNTdGF0ZSA9PiAoXHJcbiAgbWVtYmVyc1xyXG4pO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcclxuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLi8uLi9yZWR1Y2Vycyc7XHJcbmltcG9ydCAqIGFzIG1vZGVsIGZyb20gJy4uLy4uLy4uL3Jlc3QtYXBpL21vZGVsJztcclxuaW1wb3J0IHsgbWFwTWVtYmVyTGlzdE1vZGVsVG9WTSB9IGZyb20gJy4vbWFwcGVycyc7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TWVtYmVycyA9IChzdGF0ZTogU3RhdGUpOiBtb2RlbC5NZW1iZXJbXSA9PiBzdGF0ZS5tZW1iZXJzO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE1lbWJlcnNWTSA9IGNyZWF0ZVNlbGVjdG9yKFxyXG4gIGdldE1lbWJlcnMsXHJcbiAgKG1lbWJlcnMpID0+IG1hcE1lbWJlckxpc3RNb2RlbFRvVk0obWVtYmVycylcclxuKTtcclxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBsb2dpblJlZHVjZXIsIExvZ2luU3RhdGUgfSBmcm9tICcuL2xvZ2luJztcclxuaW1wb3J0IHsgbWVtYmVyc1JlZHVjZXIsIE1lbWJlcnNTdGF0ZSB9IGZyb20gJy4vbWVtYmVycy9saXN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xyXG4gIGxvZ2luOiBMb2dpblN0YXRlO1xyXG4gIG1lbWJlcnM6IE1lbWJlcnNTdGF0ZTtcclxufVxyXG5leHBvcnQgY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnM8U3RhdGU+KHtcclxuICBsb2dpbjogbG9naW5SZWR1Y2VyLFxyXG4gIG1lbWJlcnM6IG1lbWJlcnNSZWR1Y2VyLFxyXG59KTtcclxuIiwiaW1wb3J0IHsgTG9naW5FbnRpdHkgfSBmcm9tICcuLi9tb2RlbCc7XHJcblxyXG5leHBvcnQgY29uc3QgbG9naW4gPSAobG9naW5FbnRpdHk6IExvZ2luRW50aXR5KTogUHJvbWlzZTxhbnk+ID0+IChcclxuICBpc1ZhbGlkTG9naW4obG9naW5FbnRpdHkpID9cclxuICAgIFByb21pc2UucmVzb2x2ZSgpIDpcclxuICAgIFByb21pc2UucmVqZWN0KCdOb3QgdmFsaWQgbG9naW4gb3IgcGFzc3dvcmQnKVxyXG4pO1xyXG5cclxuY29uc3QgaXNWYWxpZExvZ2luID0gKGxvZ2luRW50aXR5OiBMb2dpbkVudGl0eSkgPT4gKFxyXG4gIGxvZ2luRW50aXR5LmxvZ2luID09PSAnYWRtaW4nICYmXHJcbiAgbG9naW5FbnRpdHkucGFzc3dvcmQgPT09ICd0ZXN0J1xyXG4pO1xyXG4iLCJpbXBvcnQgeyBNZW1iZXIgfSBmcm9tICcuLi9tb2RlbC9tZW1iZXInO1xyXG5cclxuY29uc3QgYmFzZVVybCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL29yZ3MvbGVtb25jb2RlL21lbWJlcnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZldGNoTWVtYmVycyA9ICgpOiBQcm9taXNlPE1lbWJlcltdPiA9PiAoXHJcbiAgZmV0Y2goYmFzZVVybClcclxuICAgIC50aGVuKGV4dHJhY3RQYXlsb2FkKVxyXG4pO1xyXG5cclxuY29uc3QgZXh0cmFjdFBheWxvYWQgPSAocmVzcG9uc2U6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+ID0+IChcclxuICByZXNwb25zZS5vayA/XHJcbiAgICByZXNwb25zZS5qc29uKCkgOlxyXG4gICAgcmVzcG9uc2VFcnJvcihyZXNwb25zZSlcclxuKTtcclxuXHJcbmNvbnN0IHJlc3BvbnNlRXJyb3IgPSAocmVzcG9uc2U6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+ID0+IChcclxuICByZXNwb25zZS5qc29uKClcclxuICAgIC50aGVuKChlcnJvcikgPT4gKFxyXG4gICAgICBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlKVxyXG4gICAgKSlcclxuKTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9jb21tb24vY29uc3RhbnRzL3JvdXRlcyc7XHJcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vYXBwJztcclxuaW1wb3J0IHsgTG9naW5QYWdlQ29udGFpbmVyLCBNZW1iZXJMaXN0UGFnZUNvbnRhaW5lciB9IGZyb20gJy4vcGFnZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJvdXRlcyA9ICgpID0+IChcclxuICA8QXBwPlxyXG4gICAgPFN3aXRjaD5cclxuICAgICAgPFJvdXRlXHJcbiAgICAgICAgZXhhY3Q9e3RydWV9XHJcbiAgICAgICAgcGF0aD17cm91dGVzLmRlZmF1bHR9XHJcbiAgICAgICAgY29tcG9uZW50PXtMb2dpblBhZ2VDb250YWluZXJ9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPXtyb3V0ZXMubWVtYmVyc30gY29tcG9uZW50PXtNZW1iZXJMaXN0UGFnZUNvbnRhaW5lcn0gLz5cclxuICAgIDwvU3dpdGNoPlxyXG4gIDwvQXBwPlxyXG4pO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgcmVkdXhUaHVuayBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCB7IHJlZHVjZXJzIH0gZnJvbSAnLi9wYWdlcyc7XHJcblxyXG5jb25zdCBub25UeXBlZFdpbmRvdzogYW55ID0gd2luZG93O1xyXG5jb25zdCBjb21wb3NlRW5oYW5jZXJzID0gbm9uVHlwZWRXaW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XHJcblxyXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcclxuICByZWR1Y2VycyxcclxuICBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZShyZWR1eFRodW5rKSlcclxuKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==