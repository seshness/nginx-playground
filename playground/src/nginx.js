/*global globalThis*/

export default function runNginx({
  writeToConsole,
  onExit,
  onAbort,
  nginxConf,
}) {
  const np = globalThis.nginx({
    print: function(output) {
      writeToConsole(`stdout: ${output}`);
    },
    printErr: function(output) {
      if (output && (output.includes('[debug]') || output.includes('[alert]'))) {
        return;
      }
      writeToConsole(`stderr: ${output}`);
    },
    noInitialRun: true,
    onRuntimeInitialized() {
      const { FS } = this;
      FS.mkdir('/usr');
      FS.mkdir('/usr/local');
      FS.mkdir('/usr/local/nginx');
      FS.mkdir('/usr/local/nginx/logs');
      FS.mkdir('/usr/local/nginx/conf');

      FS.writeFile('/usr/local/nginx/conf/nginx.conf', nginxConf);

      this.callMain(["-g", "master_process off; daemon off; user nginx;"]);
    },
    onAbort() {
      writeToConsole("nginx aborted");
      onAbort();
    },
    onExit() {
      writeToConsole("nginx exited");
      onExit();
    },
  });
  return np;
}
