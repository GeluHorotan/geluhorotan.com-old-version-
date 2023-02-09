export type Response = {
  then(arg0: (res: any) => void): unknown;
  success: boolean;
  msg: string;
  data?: any;
};
