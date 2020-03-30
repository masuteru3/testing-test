<template>
  <div class="history">
    <h3>履歴</h3>
    <table>
      <tr>
        <th>値１</th>
        <th></th>
        <th>値２</th>
        <th>結果</th>
        <th></th>
      </tr>
      <tr v-for="(history, index) in histories" :key="index">
        <td>{{ history.num1 }}</td>
        <td>{{ history.mode }}</td>
        <td>{{ history.num2 }}</td>
        <td class="result">{{ history.result }}</td>
        <td class="clear" @click="$emit('on-clear', index)">×</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    histories: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin-top: 80px;
  margin-bottom: 8px;
}
table {
  margin: 0 auto 40px;
  width: 400px;
  border-collapse: collapse;
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  th {
    background-color: #4caf50;
    color: white;
    font-weight: normal;
  }
  th,
  td {
    padding: 0.3em 0;
  }
}

.result {
  font-weight: bold;
}
.clear {
  cursor: pointer;
}
</style>
