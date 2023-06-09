import { IsNumber } from "class-validator"

export class CreateSaleDto {
 p_cait_id: any
 p_cait_quantity: any
 p_cait_unit_price: any
 p_cait_user_entity_id: any
 p_cait_prog_entity_id: any

 //---------------------------//

 p_spof_id: any
 p_spof_description: any
 p_spof_discount: any
 p_spof_type: any
 p_spof_start_date: any
 p_spof_end_date: any
 p_spof_min_qty: any
 p_spof_max_qty: any
 p_spof_cate_id: any
 p_soco_id: any
 p_soco_prog_entity_id: any
 p_soco_status: any

 //---------------------------//

 p_sode_unit_discount: any
 p_sode_soco_id: any
 p_sohe_order_date: any
 p_sohe_due_date: any
 p_sohe_ship_date: any
 p_sohe_order_number: any
 p_sohe_account_number: any
 p_sohe_trpa_code_number: any
 p_sohe_license_code: any
 p_sohe_user_entity_id: any
 p_sohe_status: any

}
