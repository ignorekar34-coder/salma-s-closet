import { Product, CartItem } from '../types';

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'Cash on Delivery (COD)' | 'Bank Transfer (Meezan/HBL/EasyPaisa)';
  notes?: string;
}

export function sanitizePhoneNumber(phone: string): string {
  // Strip any '+', spaces, dashes, or parentheses
  const cleaned = phone.replace(/[^0-9]/g, '');
  // If user entered 0300..., convert leading 0 to 92300...
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return '92' + cleaned.slice(1);
  }
  return cleaned || '923000000000';
}

/**
 * Creates 1-click WhatsApp order link for a single suit
 */
export function createSingleProductWhatsAppUrl(
  product: Product,
  whatsappNumber: string,
  selectedSize: string = 'Unstitched',
  customNote?: string
): string {
  const cleanPhone = sanitizePhoneNumber(whatsappNumber);
  
  let text = `Assalam-o-Alaikum! Mujhe ye suit order karna hai:\n\n`;
  text += `👗 *${product.name}*\n`;
  text += `🔖 Code: ${product.code}\n`;
  text += `🧵 Fabric: ${product.fabric}\n`;
  text += `💰 Price: Rs. ${product.price.toLocaleString()}\n`;
  text += `✂️ Size / Stitching: ${selectedSize}\n`;
  if (customNote && customNote.trim()) {
    text += `📝 Note: ${customNote.trim()}\n`;
  }
  text += `\n📍 Website: SALMA'S CLOSET`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates WhatsApp checkout link for multiple cart items with customer details
 */
export function createCartWhatsAppUrl(
  items: CartItem[],
  customer: CustomerOrderInfo,
  whatsappNumber: string,
  shippingFee: number
): string {
  const cleanPhone = sanitizePhoneNumber(whatsappNumber);
  const itemsSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const grandTotal = itemsSubtotal + shippingFee;

  let text = `Assalam-o-Alaikum! Mujhe SALMA'S CLOSET se order confirm karna hai:\n\n`;
  text += `🛍️ *ORDER SUMMARY:*\n`;

  items.forEach((item, index) => {
    text += `${index + 1}. *${item.product.name}* (${item.product.code})\n`;
    text += `   • Qty: ${item.quantity} | Size: ${item.selectedSize}\n`;
    text += `   • Rs. ${(item.product.price * item.quantity).toLocaleString()}\n`;
    if (item.customNotes) {
      text += `   • Note: ${item.customNotes}\n`;
    }
  });

  text += `\n💵 *Subtotal:* Rs. ${itemsSubtotal.toLocaleString()}\n`;
  text += `🚚 *Delivery Charges:* ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}\n`;
  text += `✨ *Total Payable:* Rs. ${grandTotal.toLocaleString()}\n\n`;

  text += `👤 *CUSTOMER DETAILS:*\n`;
  text += `• Name: ${customer.name}\n`;
  text += `• Phone: ${customer.phone}\n`;
  text += `• City: ${customer.city}\n`;
  text += `• Delivery Address: ${customer.address}\n`;
  text += `• Payment Method: ${customer.paymentMethod}\n`;
  if (customer.notes && customer.notes.trim()) {
    text += `• Special Instructions: ${customer.notes.trim()}\n`;
  }

  text += `\nBoutique: SALMA'S CLOSET\nShukriya! Please confirm my order dispatch.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * General inquiry WhatsApp link
 */
export function createGeneralInquiryWhatsAppUrl(whatsappNumber: string, query?: string): string {
  const cleanPhone = sanitizePhoneNumber(whatsappNumber);
  const defaultText = query || "Assalam-o-Alaikum! Mujhe SALMA'S CLOSET collection ke baare mein maloomat chahiye.";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultText)}`;
}
