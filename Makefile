.PHONY: emsdk
emsdk:
	emsdk/emsdk install 2.0.31

.PHONY: emscripten
emscripten:
	cd emscripten && npm install
	cd emscripten && ln -s ../.emscripten .emscripten
