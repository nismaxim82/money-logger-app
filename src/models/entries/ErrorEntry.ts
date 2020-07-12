export default class ErrorEntry {
  success!: boolean;
  errors!: string[];

  constructor() {
    this.success = true;
    this.errors = [];
  }

  addError(error: string) {
    this.success = false;
    this.errors.push(error);
  }
}
