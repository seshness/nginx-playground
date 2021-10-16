/*global globalThis*/

export default function runCurl({
  args,
  onAbort,
  onExit,
}) {
  const curlProcess = globalThis.curl({
    print: function(output) {
      console.log('curl', output)
    },
    printErr: function(output) {
      console.warn('curl', output)
    },
    noInitialRun: true,
    onRuntimeInitialized() {
      // const { FS } = this;
      // FS.mkdir('/usr');
      // FS.mkdir('/usr/local');
      // FS.mkdir('/usr/local/nginx');
      // FS.mkdir('/usr/local/nginx/logs');
      // FS.mkdir('/usr/local/nginx/conf');

      // FS.writeFile('/usr/local/nginx/conf/nginx.conf', nginxConf);

      this.callMain(args);
    },
    onAbort(...args) {
      console.warn('curl: abort', ...args);
      onAbort();
    },
    onExit(...args) {
      console.log('curl exited');
      onExit();
    },
  });
  return curlProcess;
}
