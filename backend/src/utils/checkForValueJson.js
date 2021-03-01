
module.exports =  function checkForValueJson (json, value) {
  try {
    for (let key in json) {
        if (typeof (json[key]) === "object") {
            return checkForValueJson(json[key], value);
        } else if (json[key] === value) {
            return true;
        }
    }
    return false;
  } catch (err) {
    console.log(err);
    return -1;
  }
}
