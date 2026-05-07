import { db } from '@/db';
import { product } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  async function addProduct(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as string;
    const price = parseInt(formData.get('price') as string);
    const image = formData.get('image') as string;
    const description = formData.get('description') as string;
    const affiliateUrl = formData.get('affiliateUrl') as string;
    const shortDesc = formData.get('shortDesc') as string;

    await db.insert(product).values({
      id: crypto.randomUUID(),
      name,
      brand,
      category,
      price,
      image,
      description,
      affiliateUrl,
      shortDesc,
      rating: 0,
      reviewCount: 0,
      inStock: true,
      commissionRate: 0,
    });

    revalidatePath('/');
    redirect('/admin?success=true');
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin - Tambah Produk</h1>
      
      <form action={addProduct} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Nama Produk</label>
            <input name="name" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Merek</label>
            <input name="brand" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Kategori</label>
            <input name="category" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Harga (dalam sen)</label>
            <input name="price" type="number" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">URL Gambar</label>
          <input name="image" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">URL Afiliasi</label>
          <input name="affiliateUrl" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Deskripsi Singkat</label>
          <input name="shortDesc" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Deskripsi Lengkap</label>
          <textarea name="description" rows={4} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Tambah Produk
        </button>
      </form>
    </div>
  );
}
