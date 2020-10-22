const ethers = require('ethers');
const { presentResults, presentError } = require('./utils/present');

const keywords = [
  'convert',
];

async function run(alfy, args) {
  // An argument needs to be provided
  if (args.length <= 1) {
    presentError(alfy, 'Please specify a value to convert');
  }

  // Type of conversion is determined by the first argument
  const value = args[1];

  // Just try to convert to all types and fuck it cause yolo
  let results = [];
  tryConvertToUint(value, results);
  tryConvertToString(value, results);
  tryConvertToBytes32(value, results);

  // Present
  presentResults(alfy, results);
}

function tryConvertToBytes32(value, results) {
  try {
    const bytes32Value = ethers.utils.formatBytes32String(value);

    results.push({
      value: bytes32Value,
      message: `(bytes32) ${bytes32Value}`
    });
  } catch(err) {}
};

function tryConvertToUint(value, results) {
  try {
    const uintValue = ethers.BigNumber.from(value).toString();

    results.push({
      value: uintValue,
      message: `(uint) ${uintValue}`
    });
  } catch(err) {}
};

function tryConvertToString(value, results) {
  try {
    const stringValue = ethers.utils.toUtf8String(value);

    results.push({
      value: stringValue,
      message: `(string) ${stringValue}`
    })
  } catch(err) {}
}

module.exports = {
  keywords,
  run,
};
