const {_getOSS} = require("../lib")
const {_appointBucket} = require("../buckets")

const _listFiles = async ({number = 100, prefix, is_show_all_files = 0, next_continuation_token = ""}) => {
  await _appointBucket()
  let oss = _getOSS()
  let param = {
    "max-keys": number,
  };
  if (is_show_all_files === 0) {
    param.delimiter = "/"
  }
  if (prefix) {
    param.prefix = prefix;
  }
  ;
  if (next_continuation_token) {
    param['continuation-token'] = next_continuation_token;
  }
  return await oss.listV2(param);
}


module.exports = {
  _listFiles,
}
