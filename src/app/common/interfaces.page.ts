
export interface Client {
    name: string;
    address: string;
    street: string;
    number: number;
    machine: string;
  }
  
export interface Machine {
  brand: string;
  category: string;
  capacity: string;
  kind: string;
  model: string;
}

export interface QrCode {
  client: string;
  machine: string;
}

export interface History {
  date: string;
  content: string;
}

export interface Serial {
  initials: string;
  times: number;
}