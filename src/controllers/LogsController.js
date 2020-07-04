const NginxParser = require("nginxparser");
exports.logs = function (req, res) {
  let response = { status: "failure", data: null, err: null };
  try {
    let { from, to, ip } = req.query;
    const parser = new NginxParser(
      "$remote_addr - $remote_user [$time_local] " +
        '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"'
    );
    const path = "./test.log";
    logsJSON(path, parser, from, to, ip)
      .then((logs) => {
        response.status = "success";
        response.data = { count: logs.length, logs: logs };
        res.json(response);
      })
      .catch((err) => {
        response.err = err;
        res.status(400).json(response);
      });
  } catch (err) {
    response.err = err.message;
    res.status(400).json(response);
  }
};

function logsJSON(path, parser, from, to, ip) {
  //
  const returnJSON = [];
  return new Promise((resolve, reject) => {
    try {
      let i = 0;
      parser.read(
        path,
        function (row) {
          row.time_local = formatDateAndConvertToIST(row.time_local);
          if (from && to) {
            let valid =
              new Date(+from).getTime() > 0 && new Date(+to).getTime() > 0;
            if (valid) {
              if (
                new Date(+from) <= new Date(row.time_local) &&
                new Date(row.time_local) <= new Date(+to)
              ) {
                row.time_local = row.time_local.toString();
                returnJSON.push(row);
              }
            } else {
              reject("Invalid timestamps");
            }
          } else if (ip) {
            if (row.remote_addr === ip) {
              returnJSON.push(row);
            }
          } else {
            row.time_local = new Date(row.time_local);
            row.time_local = row.time_local.toString();
            returnJSON.push(row);
          }
          i++;
        },
        function (err) {
          if (err) {
            reject(err.message);
          }
          resolve(returnJSON);
        }
      );
    } catch (err) {
      reject(err.message);
    }
  });
}

function formatDateAndConvertToIST(datetime) {
  try {
    let date = datetime.substring(0, datetime.indexOf(":"));
    let time = datetime.substring(
      datetime.indexOf(":") + 1,
      datetime.length - 6
    );
    hms = time.split(":");
    newDate = new Date(date);
    newDate.setHours(hms[0], hms[1], hms[2], 0);
    newDate.setTime(newDate.getTime() + 5.5 * 60 * 60 * 1000);
    return newDate;
  } catch (err) {
    throw new Error("err in date formating");
  }
}
