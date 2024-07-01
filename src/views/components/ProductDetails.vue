<template>
  <div class="all-products">
    <h2>All Products</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <div class="product-info">
          <div class="product-image">
            <img :src="product.productImage" alt="Product Image" />
          </div>
          <div class="product-text">
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>SKU:</strong> {{ product.sku }}</p>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>Price:</strong> {{ product.price }}RS</p>
            <p><strong>Quantity in Stock:</strong> {{ product.quantity }}</p>
            <p><strong>Supplier:</strong> {{ product.supplier }}</p>
            <p><strong>Expiry Date:</strong> {{ product.expiryDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '@/firebase'; // Adjust the path as needed
import { collection, onSnapshot } from 'firebase/firestore';

const products = ref([]);
const loading = ref(true);
let unsubscribe;

onMounted(() => {
  const productsRef = collection(db, 'products');
  
  // Set up Firestore real-time updates
  unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
    products.value = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    loading.value = false;
  }, (error) => {
    console.error('Error fetching products: ', error);
    alert('Failed to fetch products.');
    loading.value = false;
  });
});

onUnmounted(() => {
  // Clean up the Firestore subscription when the component is unmounted
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped>
.all-products {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  flex: 1;
  max-width: 200px;
  margin-right: 20px;
}

.product-image img {
  width: 100%;
  height: auto;
}

.product-text {
  flex: 2;
}
</style>
