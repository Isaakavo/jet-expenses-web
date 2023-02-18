export class ExpenseResponse {
  message!: string;
  offset!: number;
  size!: number;
  data!: [ExpenseItem];

  constructor(jsonObj?: ExpenseResponse) {
    if (jsonObj) {
      this.message = jsonObj.message;
      this.offset = jsonObj.offset;
      this.size = jsonObj.size;
      this.data = jsonObj.data;
    }
  }
}

export class ExpenseItem {
  id!: number;
  concept!: string;
  total!: number;
  dateAdded!: string;
  tag!: [Tag];

  constructor(jsonObj?: ExpenseItem) {
    if (jsonObj) {
      this.id = jsonObj.id;
      this.concept = jsonObj.concept;
      this.total = jsonObj.total;
      this.dateAdded = jsonObj.dateAdded;
      this.tag = jsonObj.tag;
    }
  }
}

export class Tag {
  id!: string;
  dateAdded!: string;
  tagName!: string;

  constructor(jsonObj?: Tag) {
    if (jsonObj) {
      this.id = jsonObj.id;
      this.dateAdded = jsonObj.dateAdded;
      this.tagName = jsonObj.tagName;
    }
  }
}
