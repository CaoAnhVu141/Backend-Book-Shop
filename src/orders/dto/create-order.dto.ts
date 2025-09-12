import { IsNotEmpty } from "class-validator";
import { CreateOrderItemDto } from "src/order-items/dto/create-order-item.dto";

export class CreateOrderDto {

    orderCode: string;

    @IsNotEmpty({message: "User không được để trống"})
    user: string;
    
    @IsNotEmpty({message: "Địa chỉ không được để trống"})
    address: string;

    // @IsNotEmpty({message: "Tiền không được để trống"})
    // price: number;
    
    @IsNotEmpty({message: "Tổng số lượng không được để trống"})
    totalQuantity: number;

    @IsNotEmpty({message: "Ngày đặt không được để trống"})
    orderDate: Date;

    @IsNotEmpty({message: "Tổng tiền giảm giá không được để trống"})
    discountAmount: number; 

    @IsNotEmpty({message: "Phương thức thanh toán không được để trống"})
    payment: string; /// phương thức thanh toán

    coupon: string;

    @IsNotEmpty({message: "Trạng thái vận chuyển không được để trống"})
    shippingStatus: string;

    @IsNotEmpty({message: "Trạng thái đơn hàng không được để trống"})
    orderStatus: string;

    @IsNotEmpty({message: "Trạng thái thanh toán không được để trống"})
    paymentStatus: string;

    @IsNotEmpty({message: "Danh sách sản phẩm không được để trống"})
    items_order: CreateOrderItemDto[];
}
