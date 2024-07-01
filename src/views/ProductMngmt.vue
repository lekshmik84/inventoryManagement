<template>
  <div class="product-form">
    <h2>Add New Product</h2>
    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="productName">Product Name</label>
        <argon-input
          id="productName"
          v-model="productName"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <argon-input
          id="category"
          v-model="category"
          type="text"
          placeholder="Enter category"
          required
        />
      </div>
      <div class="form-group">
        <label for="sku">SKU</label>
        <argon-input
          id="sku"
          v-model="sku"
          type="text"
          placeholder="Enter SKU"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <argon-input
          id="description"
          v-model="description"
          type="text"
          placeholder="Enter description"
        />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <argon-input
          id="price"
          v-model="price"
          type="number"
          placeholder="Enter price"
          required
        />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity in Stock</label>
        <argon-input
          id="quantity"
          v-model="quantity"
          type="number"
          placeholder="Enter quantity"
          required
        />
      </div>
      <div class="form-group">
        <label for="supplier">Supplier</label>
        <argon-input
          id="supplier"
          v-model="supplier"
          type="text"
          placeholder="Enter supplier"
        />
      </div>
      <div class="form-group">
        <label for="expiryDate">Expiry Date</label>
        <argon-input
          id="expiryDate"
          v-model="expiryDate"
          type="date"
        />
      </div>
      <div class="form-group">
        <label>Product Image</label>
        <input type="file" @change="handleFileUpload" required />
      </div>
      <argon-button type="submit" variant="gradient" class="buttonColor">
        Add Product
      </argon-button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db, storage } from '@/firebase'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';

const productName = ref('');
const category = ref('');
const sku = ref('');
const description = ref('');
const price = ref('');
const quantity = ref('');
const supplier = ref('');
const expiryDate = ref('');
const productImage = ref(null);

const addProduct = async () => {
  if (!productName.value || !category.value || !sku.value || !price.value || !quantity.value || !productImage.value) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    // Upload the product image to Firebase Storage
    const imageRef = storageRef(storage, 'productImages/' + productImage.value.name);
    const snapshot = await uploadBytes(imageRef, productImage.value);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Add the product details to Firestore
    await addDoc(collection(db, 'products'), {
      name: productName.value,
      category: category.value,
      sku: sku.value,
      description: description.value,
      price: price.value,
      quantity: quantity.value,
      supplier: supplier.value,
      expiryDate: expiryDate.value,
      productImage: downloadURL,
      createdAt: new Date(),
    });

    // Reset form fields
    productName.value = '';
    category.value = '';
    sku.value = '';
    description.value = '';
    price.value = '';
    quantity.value = '';
    supplier.value = '';
    expiryDate.value = '';
    productImage.value = null;

    alert('Product added successfully!');
  } catch (e) {
    console.error('Error adding product: ', e);
    alert('Failed to add product.');
  }
};

const handleFileUpload = (event) => {
  productImage.value = event.target.files[0];
};
</script>


<style scoped>
.product-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.product-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}
.buttonColor{
  background-image: linear-gradient(310deg, #bf1eb3 0%, #2dcecc 100%);
}
</style>
