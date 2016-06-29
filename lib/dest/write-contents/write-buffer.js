'use strict';

var fo = require('../../file-operations');

function writeBuffer(file, written) {
  var opt = {
    mode: file.stat.mode,
    flag: file.flag,
  };

  fo.writeFile(file.path, file.contents, opt, onWriteFile);

  function onWriteFile(writeErr, fd) {
    if (writeErr) {
      return fo.closeFd(writeErr, fd, written);
    }

    fo.updateMetadata(fd, file, onUpdate);

    function onUpdate(statErr) {
      fo.closeFd(statErr, fd, written);
    }
  }

}

module.exports = writeBuffer;