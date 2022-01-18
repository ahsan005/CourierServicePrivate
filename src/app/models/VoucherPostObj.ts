import { VoucherDetail } from "./VoucherDetail";
import { Voucher } from "./Voucher";

export class VoucherPostObj {
  public constructor(init?: Partial<VoucherPostObj>) {
    Object.assign(this, init);
  }

  public VoucherArray: Array<Voucher>;
  public VoucherDetailArray: Array<VoucherDetail>;
}
