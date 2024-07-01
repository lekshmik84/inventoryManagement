<template>
  <div>
    <div class="stock-management">
        <h2>Stock Management</h2>
        <div class="form-group">
        <label for="productSku">Product SKU</label>
        <select v-model="selectedSku" id="productSku" required>
            <option value="">Select product SKU</option>
            <option ref="skuValue" v-for="sku in productSkus" :key="sku" :value="sku">{{ sku }}</option>
        </select>
        </div>
        <div class="form-group">
        <label for="adjustmentType">Adjustment Type</label>
        <select v-model="adjustmentType" id="adjustmentType" required>
            <option value="">Select adjustment type</option>
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
        </select>
        </div>
        <div class="form-group">
        <label for="quantity">Quantity</label>
        <argon-input
            id="quantity"
            v-model="quantity"
            type="number"
            placeholder="Enter quantity"
            required
        />
        </div>
        <argon-button @click="adjustStock" variant="gradient" class="bgColor">
        Adjust Stock
        </argon-button>
    </div>
    <ProductDetails/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase'; // Adjust the path as needed
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';
import ProductDetails from '../views/components/ProductDetails.vue';

const adjustmentType = ref('');
const quantity = ref('');
const productSkus = ref([]);
const selectedSku = ref('');

onMounted(async () => {
  try {
    // Fetch all product SKUs
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);

    querySnapshot.forEach((doc) => {
      productSkus.value.push(doc.data().sku);
    });
  } catch (error) {
    console.error('Error fetching product SKUs:', error);
    alert('Failed to fetch product SKUs.');
  }
});

const adjustStock = async () => {
  if (!selectedSku.value || !adjustmentType.value || !quantity.value) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    // Find the product by SKU
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('sku', '==', selectedSku.value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert('Product not found');
      return;
    }

    // Assuming SKU is unique, we take the first document
    const productDoc = querySnapshot.docs[0];
    const productData = productDoc.data();

    let newQuantity = productData.quantity;

    if (adjustmentType.value === 'in') {
      newQuantity += parseInt(quantity.value);
    } else if (adjustmentType.value === 'out') {
      newQuantity -= parseInt(quantity.value);
      if (newQuantity < 0) {
        alert('Insufficient stock');
        return;
      }
    }

    // Update the product's quantity
    await updateDoc(doc(db, 'products', productDoc.id), {
      quantity: newQuantity,
    });

    // Add a new document to the stockMovements collection
    await addDoc(collection(db, 'stockMovements'), {
      sku: productData.sku,
      name: productData.name,
      category: productData.category,
      type: adjustmentType.value,
      quantity: parseInt(quantity.value),
      date: new Date(), // Store the current date
    });

    alert('Stock adjusted successfully!');
    selectedSku.value = '';
    adjustmentType.value = '';
    quantity.value = '';
  } catch (e) {
    console.error('Error adjusting stock: ', e);
    alert('Failed to adjust stock.');
  }
};

</script>

<style scoped>
.stock-management {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.stock-management h2 {
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

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.bgColor{
    background-image: linear-gradient(310deg, #bf1eb3 0%, #2dcecc 100%);
}
</style>
