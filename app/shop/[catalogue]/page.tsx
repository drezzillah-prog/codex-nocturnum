import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ catalogue: product.catalogue }));
}

export async function generateMetadata({ params }: { params: Promise<{ catalogue: string }> }) {
  const { catalogue } = await params;
  const product = products.find((item) => item.catalogue === decodeURIComponent(catalogue));
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${product.size}. A catalogued Codex Nocturnum archive object.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ catalogue: string }> }) {
  const { catalogue } = await params;
  const product = products.find((item) => item.catalogue === decodeURIComponent(catalogue));
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
