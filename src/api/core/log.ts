class logger {
  static info(message: any) {
    console.log("INFO:", message);
  }
  static data(message: any, data: unknown) {
    console.log("DATA:", message);
    console.log(data);
  }
  static error(message: any, data: any) {
    console.log("ERROR:", message);
    console.log(data);
  }
}

export default logger;
