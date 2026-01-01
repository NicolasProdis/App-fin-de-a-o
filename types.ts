
export interface Wish {
  id: string;
  name: string;
  text: string;
  color: string;
  size: number;
  posX: number;
  duration: number;
  delay: number;
  order: number; // Nuevo campo para determinar cuántas bombitas pequeñas le acompañan
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
