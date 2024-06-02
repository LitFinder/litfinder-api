class Inputrror extends Error {
  constructor(message) {
    super(message);
    this.name = "InputError";
  }
}

export default Inputrror;