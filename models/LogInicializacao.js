const mongoose = require('mongoose');

const CmdLineSchema = new mongoose.Schema({
  config: String,
  net: {
    bindIp: String,
    port: Number
  },
  service: Boolean,
  storage: {
    dbPath: String
  },
  systemLog: {
    destination: String,
    logAppend: Boolean,
    path: String
  }
}, { _id: false });

const BuildInfoSchema = new mongoose.Schema({
  version: String,
  gitVersion: String,
  targetMinOS: String,
  modules: [String],
  allocator: String,
  javascriptEngine: String,
  sysInfo: String,
  versionArray: [Number],
  openssl: mongoose.Schema.Types.Mixed,
  buildEnvironment: mongoose.Schema.Types.Mixed,
  bits: Number,
  debug: Boolean,
  maxBsonObjectSize: Number,
  storageEngines: [String]
}, { _id: false });

const LogInicializacaoSchema = new mongoose.Schema({
  _id: String,
  hostname: String,
  startTime: Date,
  startTimeLocal: String,
  cmdLine: CmdLineSchema,
  pid: Number,
  buildinfo: BuildInfoSchema
});

module.exports = mongoose.model('LogInicializacao', LogInicializacaoSchema, 'local.startap_log');
