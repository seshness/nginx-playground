unexport EM_CONFIG

.PHONY: emsdk
emsdk:
	emsdk/emsdk install 2.0.31

.PHONY: emscripten
emscripten:
	cd emscripten && npm install
	cd emscripten && ln -s ../.emscripten .emscripten

.PHONY: nginx-configure-release
nginx-configure-release:
	$(MAKE) nginx-configure RELEASE_FLAGS="-Oz"

.PHONY: nginx-configure
nginx-configure:
	# thanks to https://github.com/wapm-packages/nginx
	cd nginx && ../emscripten/emconfigure auto/configure --with-debug --without-http_gzip_module --crossbuild=Linux --builddir=objs_wasm --with-debug --with-cc-opt="-g -Wno-sign-compare" --with-ld-opt="-g $(RELEASE_FLAGS)  -s VERBOSE -s WASM=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s EXPORTED_RUNTIME_METHODS=ccall,cwrap,callMain,FS,abort -s FORCE_FILESYSTEM=1 -s SOCKET_DEBUG=1 -s ASYNCIFY -s ASYNCIFY_IMPORTS=__sys_poll -s MODULARIZE=1 -s EXPORT_NAME=nginx -s EXIT_RUNTIME=1 --extern-post-js ../auto-run-nginx-in-node.js" --without-select_module --with-poll_module --with-pcre=../pcre

.PHONY: nginx-build
nginx-build:
	cd nginx && ../emscripten/emmake make -j4

.PHONY: curl-autoreconf
curl-autoreconf:
	cd curl && ../emscripten/emconfigure autoreconf -fi

.PHONY: curl-configure-release
curl-configure-release:
	$(MAKE) curl-configure RELEASE_FLAGS="-Oz"

.PHONY: curl-configure
curl-configure:
	cd curl && ../emscripten/emconfigure ./configure --host wasm32 --disable-threaded-resolver --without-ssl --disable-shared --without-libpsl --disable-netrc --disable-crypto-auth --disable-proxy --disable-unix-sockets --disable-versioned-symbols --enable-hidden-symbols --without-libidn --without-librtmp --without-zlib --disable-thread --disable-ipv6 --disable-tftp --disable-ntlm-wb --prefix=$(CURDIR)/curl/install --with-ld-opt="-g $(RELEASE_FLAGS) -s VERBOSE -s WASM=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s EXPORTED_RUNTIME_METHODS=ccall,cwrap,callMain,FS,abort -s FORCE_FILESYSTEM=1 -s SOCKET_DEBUG=1 -s ASYNCIFY -s ASYNCIFY_IMPORTS=__sys_poll -s MODULARIZE=1 -s EXPORT_NAME=curl -s EXIT_RUNTIME=1 -s SYSCALL_DEBUG=1 --extern-post-js ../auto-run-curl-in-node.js"

.PHONY: curl-build
curl-build:
	cd curl && ../emscripten/emmake make -j4

.PHONY: playground-build
playground-build:
	cd playground && npm run build
