<template>
  <div class="history">
    <h3 class="history__title">履歴</h3>
    <table class="history__table">
      <tr class="history__table-header">
        <th class="history__table-cell">値１</th>
        <th class="history__table-cell"></th>
        <th class="history__table-cell">値２</th>
        <th class="history__table-cell">結果</th>
        <th class="history__table-cell"></th>
      </tr>
      <tr v-for="(history, index) in histories" :key="index" class="history__table-item">
        <td class="history__table-cell">{{ history.num1 }}</td>
        <td class="history__table-cell">{{ history.mode }}</td>
        <td class="history__table-cell">{{ history.num2 }}</td>
        <td id="result" class="history__table-cell history__table-cell--result">{{ history.result }}</td>
        <td class="history__table-cell history__table-cell--clear-item" @click="$emit('on-clear', index)" title="リストの削除">×</td>
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
.history {
  &__title {
    margin-top: 80px;
    margin-bottom: 8px;
    font-size: 1.1em;
  }
  &__table {
    margin: 0 auto 40px;
    width: 400px;
    border-collapse: collapse;
  }
  %__height {
    height: 35px;
  }
  &__table-header {
    @extend %__height;
    background-color: #4caf50;
    color: white;
  }
  &__table-item {
    @extend %__height;
    &:nth-child(odd) {
      background-color: #f2f2f2;
    }
    &:nth-child(even) {
      background-color: #fafafa;
    }
  }
  &__table-cell {
    font-weight: normal;
    vertical-align: middle;
  }
  &__table-cell {
    padding: 0.3em 0;

    &--result {
      font-weight: bold;
    }
    &--clear-item {
      cursor: pointer;
    }
    &--clear-item:hover {
      font-weight: bold;
    }
  }
}
</style>
