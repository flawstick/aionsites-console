export interface TimeEvent {
  id: string;
  name: string;
  start: string;
  end: string;
  type: "meal" | "break";
}

export interface MealEvent extends TimeEvent {
  type: "meal";
  linkedBreaks: string[];
}

export interface BreakEvent extends TimeEvent {
  type: "break";
  linkedMealId?: string;
}

export type Category = {
  _id: string;
  name: string;
  description: string;
  index: number;
};

export type Addition = {
  name: string;
  price: number;
  multiple?: boolean;
  indexDaysAvailable?: number[];
  isSpicy?: boolean;
  spiceLevel?: number;
  vegan?: boolean;
  max?: number;
};

export type Modifier = {
  _id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: Addition[];
  max?: number;
  indexDaysAvailable?: number[];
};

// Option Interface
interface IOption {
  name: string;
  price: number;
  quantity: number;
  multiple?: boolean;
}

// Modifier Interface
interface IModifier {
  name: string;
  required: boolean;
  multiple: boolean;
  max?: number;
  options: IOption[];
}

// Order Item Interface
interface IOrderItem {
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: string;
  modifiers: IModifier[];
}

// Order Status Type
type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "dispatched"
  | "delivered"
  | "rejected"
  | "cancelled"
  | string;

// Order Interface
export interface IOrder {
  _id?: string;
  userId: string;
  items: IOrderItem[];
  status: OrderStatus;
  customerName: string;
  customerProfile: any;
  orderNumber: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  companyName: string;
  tenantId: string;
  address: string;
  messageToKitchen: string;
  tip: number;
  discountedPrice: number;
  totalPrice: number;
  restaurantName: string;
  restaurantProfile: any;
  restaurantAddress: string;
}
