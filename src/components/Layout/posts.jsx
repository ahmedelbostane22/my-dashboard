import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useState , useEffect,  } from 'react';
import FormDialog from './form';
import EditForm from '../EditForm';
import Button from '@mui/material/Button';
import { db, collection , updateDoc, doc, deleteDoc , addDoc } from "./firebase"; 
import { useSearch } from "../pages/SearchContext";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import { onSnapshot,  } from 'firebase/firestore';

const initialProducts = [
  {
    id: 1,
    name: 'Earthen Bottle',
    price: '$48',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    price: '$35',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    price: '$89',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
];

function Post() {
  const [products, setProducts] = useState(initialProducts);
  const [favorite, setFavorite] = useState({});
   const [categories, setCategories] = useState([]);

const { search } = useSearch();

   


useEffect(()=>{
  const unsub =onSnapshot (collection(db,"products"),(snapshot)=>{
    const data = snapshot.docs.map(doc=>({id:doc.id,...doc.data() }));
      setProducts(data);
    });

     return () => unsub(); 
  }, []);


useEffect(()=>{
    const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setCategories(data);
      console.log("Categories:", data);
    });
     return () => unsub();
  
},[])






 

 const addProduct = async (newProduct) => {
  try {
    await addDoc(collection(db, "products"), newProduct);
  } catch (error) {
    console.log("Error adding document:", error);
  }
};



const EditProduct = async (updatedProduct) => {
  try {
    const productRef = doc(db, "products", updatedProduct.id);
    await updateDoc(productRef, updatedProduct);
  } catch (error) {
    console.log("Error updating document:", error);
  }
};



const deleteProduct =async(id)=>{
  try{
   await deleteDoc(doc(db,"products",id));
  }catch(error){
    console.log("Error deleting document:", error);
  }
}




  // const EditProduct = (updatedProduct) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  //   );
  // };

  // const deleteProduct = (id) => {
  //   setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  // };

  const toggleFavorite = (id) => {
    setFavorite((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = products.filter((product) =>
  `${product.title ?? ""} 
   ${product.category ?? ""} 
   ${product.description ?? ""} 
   ${product.price ?? ""}`
    .toString()
    .toLowerCase()
    .includes((search ?? "").toLowerCase())
);
 return (
 <div className="mx-auto max-w-screen-xl px-2 md:px-8 py-6 md:py-16">
    <FormDialog addProduct={addProduct} categories={categories} />

    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        width: "100%",
        mt: 2,
      }}
    >
      <Table
        sx={{
          minWidth: { xs: 700, md: 700 },
        }}
        aria-label="products table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Favorite</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 md:w-20 rounded-lg"
                />
              </TableCell>

              <TableCell>{product.title}</TableCell>

              <TableCell>{product.price} EGP</TableCell>

              <TableCell onClick={() => toggleFavorite(product.id)}>
                {favorite[product.id] ? (
                  <MdFavorite className="text-red-500 text-xl cursor-pointer" />
                ) : (
                  <MdFavoriteBorder className="text-red-500 text-xl cursor-pointer" />
                )}
              </TableCell>

              <TableCell align="center">
                <div className="flex flex-col md:flex-row gap-2 justify-center">
                  <EditForm
                    EditProduct={EditProduct}
                    product={product}
                    categories={categories}
                  />

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
}

export default Post;