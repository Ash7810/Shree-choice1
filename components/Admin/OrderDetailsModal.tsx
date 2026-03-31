
import React from 'react';
import { Order } from '../../types';
import { XIcon } from '../icons/Icon';

interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-8 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-bounce-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Order Details</h2>
                        <p className="text-sm text-slate-500 font-mono">ID: {order.id}</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"><XIcon className="w-5 h-5 text-slate-500"/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Order Info</h3>
                            <div className="text-sm space-y-2">
                                <p><span className="font-bold text-slate-600">Date:</span> {new Date(order.created_at).toLocaleString()}</p>
                                <div className="flex items-center"><span className="font-bold text-slate-600 mr-2">Status:</span> 
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p><span className="font-bold text-slate-600">Total:</span> ₹{order.total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Address</h3>
                            <div className="text-sm space-y-1 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <p className="font-bold text-base text-slate-800">{order.shipping_address.full_name}</p>
                                <p className="text-slate-600">{order.shipping_address.street}</p>
                                <p className="text-slate-600">{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.zip_code}</p>
                                <p className="text-slate-600">{order.shipping_address.country}</p>
                                <p className="mt-2 font-mono text-slate-600">Phone: {order.shipping_address.phone}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column: Items */}
                    <div>
                         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Items Ordered ({order.items.length})</h3>
                         <div className="space-y-3 max-h-96 overflow-y-auto border border-slate-200 rounded-lg p-3 bg-slate-50">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                                    <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-md border" />
                                    <div className="flex-grow">
                                        <p className="text-sm font-bold text-slate-800 leading-tight">{item.name}</p>
                                        <p className="text-xs text-slate-500">₹{item.price} x {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-slate-700">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8 border-t border-slate-200 pt-6">
                    <button onClick={onClose} className="px-6 py-2.5 bg-slate-200 text-slate-800 font-bold rounded-lg hover:bg-slate-300 text-sm">Close</button>
                </div>
            </div>
        </div>
    );
};
