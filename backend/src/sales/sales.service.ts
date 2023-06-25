import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { cart_items } from 'models/sales';

@Injectable()
export class SalesService {
  constructor(private sequelize : Sequelize){}

  //-------------------- View Payment ----------------------------

  async viewPayment():Promise<any> {
    const query = 'select * from sales.payment_users_view';
    const result = await this.sequelize.query(query);
    return result[0];
  }

  //-------------------- View Diskon ----------------------------

  async viewDiskon():Promise<any> {
    const query = 'select * from sales.diskon_view';
    const result = await this.sequelize.query(query);
    return result[0];
  }

  //------------------ View Cart Items ---------------------------

  async viewCartItems():Promise<any> {
    const query = 'select * from sales.viev_cart_items';
    const result = await this.sequelize.query(query);
    return result[0];
  }
  
  //------------------ Insert Cart Items -------------------------
  
  async insertCartItem(createSaleDto: CreateSaleDto): Promise<any> {
    try {
      await this.sequelize.query(
        `CALL sales.insert_cart_item(
          :p_cait_id,
          :p_cait_quantity,
          :p_cait_unit_price,
          :p_cait_user_entity_id,
          :p_cait_prog_entity_id
        )`,
        {
          replacements: {
            p_cait_id: createSaleDto.p_cait_id,
            p_cait_quantity: createSaleDto.p_cait_quantity,
            p_cait_unit_price: createSaleDto.p_cait_unit_price,
            p_cait_user_entity_id: createSaleDto.p_cait_user_entity_id,
            p_cait_prog_entity_id: createSaleDto.p_cait_prog_entity_id,
          },
        },
      );

      // Menggunakan message helper untuk menampilkan pesan berhasil
      const successMessage = 'Data inserted successfully.';
      this.sendMessage(successMessage);
    } catch (error) {
      const errorMessage = `Error inserting data: ${error.message}`;
      this.sendMessage(errorMessage);
    }
  }

  private sendMessage(message: string) {
    console.log(message);
  }

  //------------------ Insert Special Offer dan Programs -------------------------

  async insertSpecialOfferAndPrograms(createSaleDto: CreateSaleDto): Promise<any> {
    try {
      await this.sequelize.query(
        `CALL sales.insert_special_offer_and_program(
          :p_spof_id,
          :p_spof_description,
          :p_spof_discount,
          :p_spof_type,
          :p_spof_start_date,
          :p_spof_end_date,
          :p_spof_min_qty,
          :p_spof_max_qty,
          :p_spof_cate_id,
          :p_soco_id,
          :p_soco_prog_entity_id,
          :p_soco_status
        )`,
        {
          replacements: {
            p_spof_id: createSaleDto.p_spof_id,
            p_spof_description: createSaleDto.p_spof_description,
            p_spof_discount: createSaleDto.p_spof_discount,
            p_spof_type: createSaleDto.p_spof_type,
            p_spof_start_date: createSaleDto.p_spof_start_date,
            p_spof_end_date: createSaleDto.p_spof_end_date,
            p_spof_min_qty: createSaleDto.p_spof_min_qty,
            p_spof_max_qty: createSaleDto.p_spof_max_qty,
            p_spof_cate_id: createSaleDto.p_spof_cate_id,
            p_soco_id: createSaleDto.p_soco_id,
            p_soco_prog_entity_id: createSaleDto.p_soco_prog_entity_id,
            p_soco_status: createSaleDto.p_soco_status,
          },
        },
      );

      const successMessage = 'Special offer and programs inserted successfully.';
      this.sendMessage1(successMessage);
    } catch (error) {
      const errorMessage = `Error inserting special offer and programs: ${error.message}`;
      this.sendMessage1(errorMessage);
    }
  }

  private sendMessage1(message: string) {
    console.log(message);
  }

  //------------------ Insert Order Header dan Order Detail -------------------------

  async insertSalesOrderDetail(createSaleDto: CreateSaleDto): Promise<any> {
    try {
      const query = `
        CALL sales.sales_place_order(
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        )
      `;
      const replacements = [
        createSaleDto.p_cait_id,
        createSaleDto.p_cait_quantity,
        createSaleDto.p_cait_unit_price,
        createSaleDto.p_cait_user_entity_id,
        createSaleDto.p_cait_prog_entity_id,
        createSaleDto.p_sode_unit_discount,
        createSaleDto.p_sode_soco_id,
        createSaleDto.p_sohe_order_date,
        createSaleDto.p_sohe_due_date,
        createSaleDto.p_sohe_ship_date,
        createSaleDto.p_sohe_order_number,
        createSaleDto.p_sohe_account_number,
        createSaleDto.p_sohe_trpa_code_number,
        createSaleDto.p_sohe_license_code,
        createSaleDto.p_sohe_user_entity_id,
        createSaleDto.p_sohe_status,
      ];
  
      await this.sequelize.query(query, { bind: replacements });
  
      const successMessage = 'Pemesanan berhasil ditempatkan.';
      this.sendMessage2(successMessage);
    } catch (error) {
      const errorMessage = `Terjadi kesalahan saat menempatkan pesanan: ${error.message}`;
      this.sendMessage2(errorMessage);
    }
  }

  //------------------ Insert Order Header dan Order Detail -------------------------

  async insertSalesOrder(createSaleDto: CreateSaleDto): Promise<any> {
    console.log(createSaleDto);
    createSaleDto = createSaleDto[0]
    try {
      await this.sequelize.query(
        `CALL sales.sales_place_order(
          :p_cait_id,
          :p_cait_quantity,
          :p_cait_unit_price,
          :p_cait_user_entity_id,
          :p_cait_prog_entity_id,
          :p_sohe_order_number,
          :p_sohe_account_number,
          :p_sohe_trpa_code_number,
          :p_sohe_license_code,
          :p_sohe_user_entity_id,
          :p_sohe_status,
          :p_sode_unit_discount,
          :p_sode_soco_id
        )`,
        {
          replacements: {
            p_cait_id: createSaleDto.p_cait_id,
            p_cait_quantity: createSaleDto.p_cait_quantity,
            p_cait_unit_price: createSaleDto.p_cait_unit_price,
            p_cait_user_entity_id: createSaleDto.p_cait_user_entity_id,
            p_cait_prog_entity_id: createSaleDto.p_cait_prog_entity_id,
            p_sohe_order_number: createSaleDto.p_sohe_order_number,
            p_sohe_account_number: createSaleDto.p_sohe_account_number,
            p_sohe_trpa_code_number: createSaleDto.p_sohe_trpa_code_number,
            p_sohe_license_code: createSaleDto.p_sohe_license_code,
            p_sohe_user_entity_id: createSaleDto.p_sohe_user_entity_id,
            p_sohe_status: createSaleDto.p_sohe_status,
            p_sode_unit_discount: createSaleDto.p_sode_unit_discount,
            p_sode_soco_id: createSaleDto.p_sode_soco_id,
          },
        }
      );
  
      const successMessage = 'Order berhasil';
      this.sendMessage2(successMessage);
    } catch (error) {
      const errorMessage = `Terjadi kesalahan saat melakukan order: ${error.message}`;
      this.sendMessage2(errorMessage);
    }
  }
  
  private sendMessage2(message: string) {
    console.log(message);
  }

  //------------------ Insert Order Header dan Order Detail IN JSON -------------------------

  // async insertSalesOrderJson(createSaleDto: CreateSaleDto): Promise<any> {
  //   console.log(createSaleDto);
  //   try {
  //     await this.sequelize.query(
  //       `CALL sales.sales_place_order_json(
  //         :p_cart_items,
  //         :p_sohe_order_number,
  //         :p_sohe_account_number,
  //         :p_sohe_trpa_code_number,
  //         :p_sohe_license_code,
  //         :p_sohe_user_entity_id,
  //         :p_sohe_status,
  //         :p_sode_unit_discount,
  //         :p_sode_soco_id
  //       )`,
  //       {
  //         replacements: {
  //           p_cart_items: JSON.stringify(createSaleDto.cartItems),
  //           p_sohe_order_number: createSaleDto.p_sohe_order_number,
  //           p_sohe_account_number: createSaleDto.p_sohe_account_number,
  //           p_sohe_trpa_code_number: createSaleDto.p_sohe_trpa_code_number,
  //           p_sohe_license_code: createSaleDto.p_sohe_license_code,
  //           p_sohe_user_entity_id: createSaleDto.p_sohe_user_entity_id,
  //           p_sohe_status: createSaleDto.p_sohe_status,
  //           p_sode_unit_discount: createSaleDto.p_sode_unit_discount,
  //           p_sode_soco_id: createSaleDto.p_sode_soco_id
  //         },
  //       }
  //     );
  
  //     const successMessage = 'Order berhasil';
  //     this.sendMessage2(successMessage);
  //   } catch (error) {
  //     const errorMessage = `Terjadi kesalahan saat melakukan order: ${error.message}`;
  //     this.sendMessage2(errorMessage);
  //   }
  // }

  ////////////////////////////////////////////////////////

  async insertSalesOrderJson(createSaleDto: CreateSaleDto): Promise<any> {
    console.log(createSaleDto);
    try {
      const result: any = await this.sequelize.query(
        `CALL sales.sales_place_order_json(
          :p_cart_items,
          :p_sohe_order_number,
          :p_sohe_account_number,
          :p_sohe_trpa_code_number,
          :p_sohe_license_code,
          :p_sohe_user_entity_id,
          :p_sohe_status,
          :p_sode_unit_discount,
          :p_sode_soco_id
        )`,
        {
          replacements: {
            p_cart_items: JSON.stringify(createSaleDto.cartItems),
            p_sohe_order_number: createSaleDto.p_sohe_order_number,
            p_sohe_account_number: createSaleDto.p_sohe_account_number,
            p_sohe_trpa_code_number: createSaleDto.p_sohe_trpa_code_number,
            p_sohe_license_code: createSaleDto.p_sohe_license_code,
            p_sohe_user_entity_id: createSaleDto.p_sohe_user_entity_id,
            p_sohe_status: createSaleDto.p_sohe_status,
            p_sode_unit_discount: createSaleDto.p_sode_unit_discount,
            p_sode_soco_id: createSaleDto.p_sode_soco_id,
          },
        }
      );
  
      // if (affectedRows > 0) {
      //   const successMessage = 'Order berhasil';
      //   this.sendMessage2(successMessage);
  
      //   return { status: 200 };
      // } else {
      //   const errorMessage = 'Gagal memasukkan data ke database';
      //   this.sendMessage2(errorMessage);
  
      //   return { status: 500 };
      // }
      return {result, status:200, message:"OK"};
    } catch (error) {
      const errorMessage = `Terjadi kesalahan saat melakukan order: ${error.message}`;
      this.sendMessage2(errorMessage);
      return { status: 500 };
    }
  }
  
  
  
  

  //------------------ Insert Order -------------------------
  
  async insertOrder(createSaleDto: CreateSaleDto): Promise<any> {
    console.log(createSaleDto);
    try {
      const {
        p_cait_id,
        p_cait_quantity,
        p_cait_unit_price,
        p_cait_user_entity_id,
        p_cait_prog_entity_id,
        p_sode_unit_discount,
        p_sode_soco_id,
        p_sohe_order_date,
        p_sohe_due_date,
        p_sohe_ship_date,
        p_sohe_order_number,
        p_sohe_account_number,
        p_sohe_trpa_code_number,
        p_sohe_license_code,
        p_sohe_user_entity_id,
        p_sohe_status,
      } = createSaleDto;
  
      await this.sequelize.query(
        `CALL sales.insert_order(
          :p_cait_id,
          :p_cait_quantity,
          :p_cait_unit_price,
          :p_cait_user_entity_id,
          :p_cait_prog_entity_id,
          :p_sode_unit_discount,
          :p_sode_soco_id,
          :p_sohe_order_date,
          :p_sohe_due_date,
          :p_sohe_ship_date,
          :p_sohe_order_number,
          :p_sohe_account_number,
          :p_sohe_trpa_code_number,
          :p_sohe_license_code,
          :p_sohe_user_entity_id,
          :p_sohe_status
        )`,
        {
          replacements: {
            p_cait_id,
            p_cait_quantity,
            p_cait_unit_price,
            p_cait_user_entity_id,
            p_cait_prog_entity_id,
            p_sode_unit_discount,
            p_sode_soco_id,
            p_sohe_order_date,
            p_sohe_due_date,
            p_sohe_ship_date,
            p_sohe_order_number,
            p_sohe_account_number,
            p_sohe_trpa_code_number,
            p_sohe_license_code,
            p_sohe_user_entity_id,
            p_sohe_status,
          },
        }
      );
  
      const successMessage = 'Pemesanan berhasil ditempatkan.';
      this.sendMessage2(successMessage);
    } catch (error) {
      const errorMessage = `Terjadi kesalahan saat menempatkan pesanan: ${error.message}`;
      this.sendMessage2(errorMessage);
    }
  }
  

  //------------------ Update Cart Items -------------------------

  async updateCartItemById(id: number, updateSaleDto: UpdateSaleDto): Promise<any> {
    try {
      await this.sequelize.query(
        `UPDATE sales.cart_items
         SET cait_quantity = :cait_quantity,
             cait_unit_price = :cait_unit_price,
             cait_user_entity_id = :cait_user_entity_id,
             cait_prog_entity_id = :cait_prog_entity_id
         WHERE cait_id = :id`,
        {
          replacements: {
            cait_quantity: updateSaleDto.cait_quantity,
            cait_unit_price: updateSaleDto.cait_unit_price,
            cait_user_entity_id: updateSaleDto.cait_user_entity_id,
            cait_prog_entity_id: updateSaleDto.cait_prog_entity_id,
            id: id,
          },
        },
      );
  
      const successMessage = 'Cart item updated successfully.';
      this.sendMessage(successMessage);
    } catch (error) {
      const errorMessage = `Error updating cart item: ${error.message}`;
      this.sendMessage(errorMessage);
    }
  }

  //------------------ Update Order Detail dan Header -------------------------

  async updateOrderDetailHeader(updateSaleDto: UpdateSaleDto): Promise<any> {
    const {
      p_sohe_id,
      p_cait_id,
      p_cait_quantity,
      p_cait_unit_price,
      p_cait_user_entity_id,
      p_cait_prog_entity_id,
      p_sode_unit_discount,
      p_sode_soco_id,
      p_sohe_order_date,
      p_sohe_due_date,
      p_sohe_ship_date,
      p_sohe_order_number,
      p_sohe_account_number,
      p_sohe_trpa_code_number,
      p_sohe_license_code,
      p_sohe_user_entity_id,
      p_sohe_status,
    } = updateSaleDto;
  
    try {
      await this.sequelize.query(
        `CALL sales.update_place_order(
          :p_sohe_id,
          :p_cait_id,
          :p_cait_quantity,
          :p_cait_unit_price,
          :p_cait_user_entity_id,
          :p_cait_prog_entity_id,
          :p_sode_unit_discount,
          :p_sode_soco_id,
          :p_sohe_order_date,
          :p_sohe_due_date,
          :p_sohe_ship_date,
          :p_sohe_order_number,
          :p_sohe_account_number,
          :p_sohe_trpa_code_number,
          :p_sohe_license_code,
          :p_sohe_user_entity_id,
          :p_sohe_status
        )`,
        {
          replacements: {
            p_sohe_id,
            p_cait_id,
            p_cait_quantity,
            p_cait_unit_price,
            p_cait_user_entity_id,
            p_cait_prog_entity_id,
            p_sode_unit_discount,
            p_sode_soco_id,
            p_sohe_order_date,
            p_sohe_due_date,
            p_sohe_ship_date,
            p_sohe_order_number,
            p_sohe_account_number,
            p_sohe_trpa_code_number,
            p_sohe_license_code,
            p_sohe_user_entity_id,
            p_sohe_status,
          },
        },
      );
  
      const successMessage = 'Order updated successfully.';
      this.sendMessage(successMessage);
    } catch (error) {
      const errorMessage = `Error updating order: ${error.message}`;
      this.sendMessage(errorMessage);
    }
  }
  
  //------------------ Update Special Offer dan Programs -------------------------  
  
  async updateSpecialOfferAndPrograms(updateSaleDto: UpdateSaleDto): Promise<any> {
    const {
      p_spof_id,
      p_spof_description,
      p_spof_discount,
      p_spof_type,
      p_spof_start_date,
      p_spof_end_date,
      p_spof_min_qty,
      p_spof_max_qty,
      p_spof_cate_id,
      p_soco_id,
      p_soco_prog_entity_id,
      p_soco_status,
    } = updateSaleDto;
  
    try {
      await this.sequelize.query(
        `CALL sales.update_special_offer_and_programs(
          :p_spof_id,
          :p_spof_description,
          :p_spof_discount,
          :p_spof_type,
          :p_spof_start_date,
          :p_spof_end_date,
          :p_spof_min_qty,
          :p_spof_max_qty,
          :p_spof_cate_id,
          :p_soco_id,
          :p_soco_prog_entity_id,
          :p_soco_status
        )`,
        {
          replacements: {
            p_spof_id,
            p_spof_description,
            p_spof_discount,
            p_spof_type,
            p_spof_start_date,
            p_spof_end_date,
            p_spof_min_qty,
            p_spof_max_qty,
            p_spof_cate_id,
            p_soco_id,
            p_soco_prog_entity_id,
            p_soco_status,
          },
        },
      );
  
      const successMessage = 'Special offer and programs updated successfully.';
      this.sendMessage(successMessage);
    } catch (error) {
      const errorMessage = `Error updating special offer and programs: ${error.message}`;
      this.sendMessage(errorMessage);
    }
  }

  //------------------ FindAll Table -------------------------    

  async findAllOrderDetail():Promise<any> {
    const query = 'select * from sales.sales_order_detail';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllOrderHeader():Promise<any> {
    const query = 'select * from sales.sales_order_header';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllCartItems():Promise<any> {
    const query = 'select * from sales.cart_items';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllSpecialOffer():Promise<any> {
    const query = 'select * from sales.special_offer';
    const result = await this.sequelize.query(query);
    return result;
  }
  async findAllSpecialOfferPrograms():Promise<any> {
    const query = 'select * from sales.special_offer_programs';
    const result = await this.sequelize.query(query);
    return result;
  }

  //------------------ FindOne -------------------------    
  
  async findOne(id: number): Promise<any> {
    const query = 'SELECT * FROM sales.sales_order_detail WHERE sode_id = :id';
    const result = await this.sequelize.query(query, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    if (result.length > 0) {
      return result[0]; // Mengembalikan data sale jika ditemukan
    } else {
      throw new NotFoundException(`Sale with ID ${id} not found`); // Melakukan throw error jika tidak ditemukan
    }
  }
  

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  //------------------ Delete Cart Items SP -------------------------  

  async deleteCartItemSP(id: number): Promise<void> {
    try {
      await this.sequelize.query(
        'CALL sales.delete_cart_item(:p_cait_id)',
        {
          replacements: { p_cait_id: id },
        },
      );

      const successMessage = 'Item keranjang berhasil dihapus.';
      this.sendMessage3(successMessage);
    } catch (error) {
      const errorMessage = `Error menghapus item keranjang: ${error.message}`;
      this.sendMessage3(errorMessage);
    }
  }

  private sendMessage3(message: string) {
    console.log(message);
  }

  //------------------ Delete Cart Items Models -------------------------    

  async hapusCartItem(id: any) : Promise<any>{
    try {
        const data = await cart_items.destroy({
            where:{
                cait_id: id
            }
        })
        return data[0]
    } catch (error) {
        return error.message
    }
}


  //------------------ Delete Cart Items -------------------------    

  async deleteCartItemById(id) {
    try {
      await this.sequelize.query(
        `DELETE FROM sales.cart_items WHERE cait_id = :id`,
        {
          replacements: {
            id: id,
          },
        },
      );
  
      const successMessage = 'Item keranjang berhasil dihapus.';
      this.sendMessage(successMessage);
    } catch (error) {
      const errorMessage = `Error menghapus item keranjang: ${error.message}`;
      this.sendMessage(errorMessage);
    }
  }
  

  //------------------ Delete Order Detail dan Header -------------------------    

  async deleteOrderById(id: number): Promise<void> {
    try {
      await this.sequelize.query(
        `DELETE FROM sales.sales_order_detail WHERE sode_sohe_id = :id;
         DELETE FROM sales.sales_order_header WHERE sohe_id = :id;`,
        {
          replacements: {
            id: id,
          },
        },
      );
  
      const successMessage = 'Order deleted successfully.';
      this.sendMessage(successMessage);
    } catch (error) {
      throw new Error(`Error deleting order: ${error.message}`);
    }
  }
  
  //------------------ Delete Special Offer dan Programs -------------------------  

  async deleteSpecialOfferById(id: number): Promise<any> {
    try {
      await this.sequelize.query(
        `
        DELETE FROM sales.sales_order_detail WHERE sode_soco_id IN (
          SELECT soco_id FROM sales.special_offer_programs WHERE soco_spof_id = :id
        );
        DELETE FROM sales.special_offer_programs WHERE soco_spof_id = :id;
        DELETE FROM sales.special_offer WHERE spof_id = :id;
        `,
        {
          replacements: {
            id: id,
          },
        },
      );
  
      const successMessage = 'Special offer deleted successfully.';
      this.sendMessage(successMessage);
    } catch (error) {
      const errorMessage = `Error deleting special offer: ${error.message}`;
      this.sendMessage(errorMessage);
    }
  }
  
}
