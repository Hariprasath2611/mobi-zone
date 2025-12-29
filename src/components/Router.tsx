import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { WixServicesProvider, rootRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/root';
import { ProductDetailsRoute, productRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/product-details';
import { StoreCollectionRoute, storeCollectionRouteLoader } from '@/wix-verticals/react-pages/react-router/routes/store-collection';
import { defaultStoreCollectionRouteRedirectLoader } from '@/wix-verticals/react-pages/react-router/routes/store-redirect';
import { Cart } from '@/wix-verticals/react-pages/react-router/routes/cart';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/components/pages/ServicesPage';
import ContactPage from '@/components/pages/ContactPage';

// Main Layout with ScrollToTop and WixServicesProvider
function MainLayout() {
  return (
    <WixServicesProvider>
      <ScrollToTop />
      <Layout />
    </WixServicesProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    loader: rootRouteLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "products/:slug",
        element: (
          <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
            <ProductDetailsRoute />
          </div>
        ),
        loader: productRouteLoader,
      },
      {
        path: "store",
        element: <></>,
        loader: defaultStoreCollectionRouteRedirectLoader,
        index: true,
      },
      {
        path: "store/:categorySlug",
        element: (
          <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
            <h1 className="font-heading text-4xl uppercase text-primary mb-8">Shop Products</h1>
            <StoreCollectionRoute productPageRoute="/products" />
          </div>
        ),
        loader: storeCollectionRouteLoader,
      },
      {
        path: "cart",
        element: (
          <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
            <h1 className="font-heading text-4xl uppercase text-primary mb-8">Shopping Cart</h1>
            <Cart />
          </div>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
