export class PostTaskDialog {
  taskTitle: string;
  taskDetails: string;
  taskLocation: string;
  taskDate: string;
  taskIdType: string;
  taskBudget: string;
  taskOffer: string;
}
export class Step1 {
  taskTitle: string;
  taskDetails: string;
}

export class Step2 {
  taskLocation: string;
  taskDate: string;
  taskIdType: string = "0";
  taskPartOfDay: string = null;
}

export class Step3 {
  taskBudget: string;
  taskOffer: string;
}



