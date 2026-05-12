import Breadcrumbs from "./Breadcrumbs";
import ImageGallery from "./ImageGallery";
import RelatedProducts from "./RelatedProducts";
import Info from "./Info";

type SectionDetailPropsType = {
  activeImage: string;
  images: string[];
  onActiveImage: (image: string) => void;
  product: any;
  relatedProducts: any[];
  purchaseType: string;
  setPurchaseType: (purchaseType: string) => void;
  subscriptionFrequency: string;
  setSubscriptionFrequency: (subscriptionFrequency: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

const SectionDetail = ({
  activeImage,
  images,
  onActiveImage,
  product,
  relatedProducts,
  purchaseType,
  setPurchaseType,
  subscriptionFrequency,
  setSubscriptionFrequency,
  quantity,
  setQuantity,
}: SectionDetailPropsType) => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
    <Breadcrumbs />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      <ImageGallery
        activeImage={activeImage}
        images={images}
        onActiveImage={onActiveImage}
        product={product}
      />
      <Info
        purchaseType={purchaseType}
        setPurchaseType={setPurchaseType}
        subscriptionFrequency={subscriptionFrequency}
        setSubscriptionFrequency={setSubscriptionFrequency}
        quantity={quantity}
        setQuantity={setQuantity}
        product={product}
      />
    </div>
    <RelatedProducts relatedProducts={relatedProducts} />
  </div>
);

export default SectionDetail;
