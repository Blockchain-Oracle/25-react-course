import "./pdfViwer.css";
import React from "react";
import useFetchProducts from "./hooks/useFetchProducts";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

export default function PdfViewer() {
  const { fetchProducts, loading, products, error } = useFetchProducts();
  const url = React.useMemo(() => "https://dummyjson.com/products", []);
  const [clickedProducts, setClickedProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts(url);
  }, [url, fetchProducts]);

  // React.useEffect(() => {
  //   fetchProductTittleDesc(productId);
  // }, [productId, fetchProductTittleDesc]);

  const handleItemonClick = (productItemId) => {
    const newProducts = [...products];
    const filterProducts = newProducts.filter(
      (product) => product.id == productItemId
    );
    console.log(filterProducts);
    setClickedProducts(filterProducts);
  };

  const productItems = products.map((productsItem) => (
    <li
      key={productsItem.id}
      className="products-item"
      onClick={() => {
        handleItemonClick(productsItem.id);
      }}
    >
      {productsItem.title}
    </li>
  ));

  const PdfViewerComponent = () => (
    <Document>
      <Page>
        <View>
          <Text>{clickedProducts && clickedProducts[0]?.title}</Text>
          <Text>{clickedProducts && clickedProducts[0]?.description}</Text>
        </View>
      </Page>
    </Document>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <h3>loading...</h3>
      </div>
    );
  }

  if (error) {
    return <h3>error something wrong, check internet connection </h3>;
  }
  return (
    <div className="pdf-viewer-container">
      <div className="products-container">
        <ul className="product-items">{productItems}</ul>
      </div>
      <>
        <div className="pdf-container">
          <PDFViewer>
            <PdfViewerComponent />
          </PDFViewer>
        </div>
        <div className="pdf-download">
          <PDFDownloadLink
            document={<PdfViewerComponent />}
            fileName="custom_name.pdf"
          >
            {({ blob, url, loading, error }) => (
              <button className="pdf-download-btn" disabled={loading}>
                {loading ? "Loading document..." : "Download"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </>
    </div>
  );
}
