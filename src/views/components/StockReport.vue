<template>
  <div class="stock-report">
    <h2>Stock Report</h2>
    <div class="form-group">
      <label for="startDate">Start Date</label>
      <argon-input
        id="startDate"
        v-model="startDate"
        type="date"
        placeholder="Select start date"
        required
      />
    </div>
    <div class="form-group">
      <label for="endDate">End Date</label>
      <argon-input
        id="endDate"
        v-model="endDate"
        type="date"
        placeholder="Select end date"
        required
      />
    </div>
    <argon-button @click="generateReport" variant="gradient" class="bgColor">
      Generate Report
    </argon-button>

    <div v-if="report.length" class="report-results">
      <h3>Stock Movements from {{ startDate }} to {{ endDate }}</h3>
      <table>
        <thead>
          <tr>
            <th>Product SKU</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Movement Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in report" :key="movement.id">
            <td>{{ movement.sku }}</td>
            <td>{{ movement.name }}</td>
            <td>{{ movement.category }}</td>
            <td>{{ movement.type }}</td>
            <td>{{ movement.quantity }}</td>
            <td>{{ movement.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '@/firebase'; // Adjust the path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';
import ArgonInput from '@/components/ArgonInput.vue';
import ArgonButton from '@/components/ArgonButton.vue';

const startDate = ref('');
const endDate = ref('');
const report = ref([]);

const generateReport = async () => {
  if (!startDate.value || !endDate.value) {
    alert('Please select a start date and an end date');
    return;
  }

  try {
    // Convert dates to Firebase Timestamp objects
    const startTimestamp = new Date(startDate.value);
    const endTimestamp = new Date(endDate.value);
    endTimestamp.setDate(endTimestamp.getDate() + 1); // Include the end date

    // Fetch stock movements within the selected date range
    const stockMovementsRef = collection(db, 'stockMovements'); // Adjust the collection name as needed
    const q = query(
      stockMovementsRef,
      where('date', '>=', startTimestamp),
      where('date', '<=', endTimestamp)
    );

    const querySnapshot = await getDocs(q);
    report.value = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      date: doc.data().date.toDate().toLocaleDateString() // Convert to readable date format
    }));

    if (report.value.length === 0) {
      alert('No stock movements found within the selected date range.');
    }
  } catch (error) {
    console.error('Error generating report: ', error);
    alert('Failed to generate report.');
  }
};
</script>

<style scoped>
.stock-report {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.stock-report h2 {
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

.report-results {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.bgColor{
    background-image: linear-gradient(310deg, #bf1eb3 0%, #2dcecc 100%);
}
</style>
