
import React, { useState, useEffect } from 'react';
import type { Product, Brand } from '../../types';
import { XIcon } from '../icons/Icon';
import { useImageUpload } from '../../hooks/useImageUpload';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (productData: Partial<Product>) => Promise<void>;
    product: Partial<Product> | null;
    brands: Brand[];
}

const ModalInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
        <input {...props} className="w-full border-slate-200 border rounded-lg p-2.5 mt-1" />
    </div>
);

const ModalSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
     <div>
        <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
        <select {...props} className="w-full border-slate-200 border rounded-lg p-2.5 mt-1 bg-white">
            {children}
        </select>
    </div>
);

const ModalTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
     <div>
        <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
        <textarea {...props} className="w-full border-slate-200 border rounded-lg p-2.5 mt-1 h-24" />
    </div>
);

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product, brands }) => {
    const [formData, setFormData] = useState<Partial<Product> | null>(product);
    const [imagesStr, setImagesStr] = useState('');
    const [tagsStr, setTagsStr] = useState('');
    const { isUploading, uploadImage } = useImageUpload();
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(product);
        setImagesStr(product?.images?.join(', ') || '');
        setTagsStr(product?.tags?.join(', ') || '');
    }, [product]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        let processedValue: any = value;
        if (type === 'number') processedValue = value === '' ? null : Number(value);
        if (e.target.type === 'checkbox') processedValue = (e.target as HTMLInputElement).checked;

        setFormData(prev => prev ? { ...prev, [name]: processedValue } : null);
    };

    const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
        const file = event.target.files[0];
        const publicUrl = await uploadImage(file);
        if (publicUrl) {
            setFormData(prev => prev ? { ...prev, image_url: publicUrl } : null);
        }
    };

    const handleSaveClick = async () => {
        if (!formData) return;
        setIsSaving(true);
        const finalData = {
            ...formData,
            images: imagesStr.split(',').map(s => s.trim()).filter(Boolean),
            tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean),
        };
        await onSave(finalData);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-bounce-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">{formData.id ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"><XIcon className="w-5 h-5 text-slate-500"/></button>
                </div>
                <div className="space-y-4">
                    <ModalInput label="Name*" name="name" value={formData.name || ''} onChange={handleChange} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ModalInput label="Selling Price (₹)*" name="price" type="number" value={formData.price || ''} onChange={handleChange} />
                        <ModalInput label="MRP / Original Price (₹)" name="original_price" type="number" value={formData.original_price || ''} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ModalSelect label="Category" name="category" value={formData.category} onChange={handleChange}>
                            {['Toys', 'Soft Toys', 'Puzzles', 'Arts & Crafts', 'STEM', 'Books', 'Infants'].map(c => <option key={c}>{c}</option>)}
                        </ModalSelect>
                        <ModalSelect label="Brand" name="brand" value={formData.brand} onChange={handleChange}>
                            {brands.map(b => <option key={b.id}>{b.name}</option>)}
                        </ModalSelect>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ModalSelect label="Age Group" name="age_group" value={formData.age_group} onChange={handleChange}>
                            {['0-12m', '1-3y', '3-5y', '5-8y', '8-14y', '14+'].map(a => <option key={a}>{a}</option>)}
                        </ModalSelect>
                        <ModalInput label="Tags (comma-separated)" name="tags" value={tagsStr} onChange={e => setTagsStr(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ModalInput label="Stock Quantity" name="stock_quantity" type="number" value={formData.stock_quantity || 0} onChange={handleChange} />
                        <ModalInput label="Rating (0-5)" name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating || ''} onChange={handleChange} />
                        <ModalInput label="Reviews Count" name="reviews" type="number" value={formData.reviews || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Main Image</label>
                        {formData.image_url && <img src={formData.image_url} alt="Preview" className="w-24 h-24 rounded-lg object-cover border my-2 bg-slate-50"/>}
                        <div className="flex gap-2 items-center mt-1">
                            <input value={formData.image_url || ''} name="image_url" onChange={handleChange} className="flex-grow border-slate-200 border rounded-lg p-2.5 text-sm" placeholder="Or paste image URL" />
                            <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-lg text-sm whitespace-nowrap">
                                {isUploading ? 'Uploading...' : 'Upload'}
                                <input type="file" hidden accept="image/*" onChange={handleImageFileChange} disabled={isUploading} />
                            </label>
                        </div>
                    </div>
                    <ModalTextArea label="Other Image URLs (comma-separated)" value={imagesStr} onChange={e => setImagesStr(e.target.value)} />
                    <ModalTextArea label="Description" name="description" value={formData.description || ''} onChange={handleChange} />
                    <label className="flex items-center gap-2"><input type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleChange} className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary"/> <span className="text-sm font-semibold text-slate-700">In Stock</span></label>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button onClick={onClose} className="px-5 py-2.5 font-bold text-slate-500 rounded-lg hover:bg-slate-100">Cancel</button>
                    <button onClick={handleSaveClick} disabled={isSaving || isUploading} className="px-6 py-2.5 bg-brand-primary text-white font-bold rounded-lg disabled:opacity-50 shadow-lg shadow-brand-primary/20">{isSaving ? 'Saving...' : 'Save Product'}</button>
                </div>
            </div>
        </div>
    );
};
