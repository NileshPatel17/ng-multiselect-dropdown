export class ListItem {
  id: String;
  text: String;
  isLabel: boolean;
  public constructor(source: any) {
    if (typeof source === 'string') {
      this.id = this.text = source;
    }
    if (typeof source === 'object') {
      this.id = source.id;
      this.text = source.text;
      this.isLabel = source.isLabel;
    }
  }
}
export class MyException {
  status: number;
  body: any;
  constructor(status: number, body: any) {
    this.status = status;
    this.body = body;
  }
}
