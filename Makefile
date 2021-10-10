.PHONY: emsdk
emsdk:
	emsdk/emsdk install 2.0.31

.PHONY: emscripten
emscripten:
	cd emscripten && npm install
	cd emscripten && ln -s ../.emscripten .emscripten

.PHONY: nginx-configure
nginx-configure:
	# thanks to https://github.com/wapm-packages/nginx
	cd nginx && ../emscripten/emconfigure auto/configure --with-debug --without-http_gzip_module --crossbuild=Linux --builddir=objs_wasm --with-debug --with-cc-opt="-g -Wno-sign-compare" --with-ld-opt="-g -s VERBOSE -s WASM=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s EXPORTED_RUNTIME_METHODS=ccall,cwrap,callMain,FS,abort -s FORCE_FILESYSTEM=1 -s SOCKET_DEBUG=1 -s ASYNCIFY -s ASYNCIFY_IMPORTS=__sys_poll -s MODULARIZE=1 -s EXPORT_NAME=nginx -s EXIT_RUNTIME=1 --extern-post-js ../auto-run-nginx-in-node.js" --without-select_module --with-poll_module --with-pcre=../pcre

.PHONY: nginx-build
nginx-build:
	cd nginx && ../emscripten/emmake make -j4
