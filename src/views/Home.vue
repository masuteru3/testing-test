<template>
  <div>
    <div class="calc">
      <h1 class="app-header__title">Vue Testing Sample</h1>
      <h3 class="calc__title">
        <select v-model="mode" class="calc__mode">
          <option value="+">足し算</option>
          <option value="-">引き算</option>
          <option value="*">掛け算</option>
          <option value="/">割り算</option>
        </select>
        <span class="clac__mode-stab">をします</span>
      </h3>
      <p class="calc__explain">数字を入力してください</p>

      <form class="clac__form" @submit.prevent="submit">
        <div class="calc__field">
          <label for="num1">値１：</label>
          <input id="num1" type="number" step="0.01" v-model.number="num1" />
        </div>
        <div class="calc__field">
          <label for="num2">値２：</label>
          <input id="num2" type="number" step="0.01" v-model.number="num2" />
        </div>
        <button class="calc__submit" type="submit">計算</button>
        <button id="reset" class="calc__reset" @click.prevent="resetParams">リセット</button>
      </form>

      <transition name="fade">
        <p v-if="result || result === 0" class="calc__result-area">結果： <span class="calc__result">{{ result }}</span></p>
      </transition>
      <transition name="fade">
        <p v-if="feedback" class="calc__feedback">{{ feedback }}</p>
      </transition>
    </div>

    <transition name="fade">
      <History v-if="history.length" :histories="history" @on-clear="clearHistory" />
    </transition>
  </div>
</template>

<script>
import History from '@/components/History'
import { add, subtract, multiply, divide, bignumber, round } from 'mathjs'

export default {
  name: 'Home',
  components: {
    History
  },
  data() {
    return {
      mode: '+',
      num1: null,
      num2: null,
      result: null,

      feedback: '',
      history: []
    }
  },
  watch: {
    // feedbackを一定時間表示後に消す
    feedback(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.feedback = ''
        }, 4000)
      }
    }
  },
  mounted() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    submit() {
      if (!this.num1 && !this.num2) {
        this.feedback = '適切な値を入力してください'
        return
      } else {
        this.feedback = ''
      }

      this.calculate()
      this.addHistory()
    },
    resetParams() {
      this.mode = '+'
      this.num1 = null
      this.num2 = null
      this.result = null
      this.feedback = ''
    },
    clearHistory(index) {
      this.history.splice(index, 1)
      this.setStrage()
    },

    calculate() {
      // 値がnull等の場合、０を代入
      this.num1 = this.num1 || 0
      this.num2 = this.num2 || 0

      let answer = null
      if (this.mode === '+') answer = add(bignumber(this.num1), bignumber(this.num2)).toNumber()
      if (this.mode === '-') answer = subtract(bignumber(this.num1), bignumber(this.num2)).toNumber()
      if (this.mode === '*') answer = multiply(bignumber(this.num1), bignumber(this.num2)).toNumber()
      if (this.mode === '/') answer = divide(bignumber(this.num1), bignumber(this.num2)).toNumber()

      this.result = round(answer, 2)
    },
    addHistory() {
      this.history.unshift({
        mode: this.mode,
        num1: this.num1,
        num2: this.num2,
        result: this.result
      })
      this.setStrage()
    },
    setStrage() {
      localStorage.setItem('history', JSON.stringify(this.history))
    }
  }
}
</script>

<style scoped lang="scss">
.app-header__title {
  line-height: 60px;
  font-weight: normal;
}
.calc {
  &__title {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  &__mode {
    padding: 5px 8px 2px;
    font-weight: bold;
    background-color: rgb(247, 247, 247);
    border-bottom: 3px solid yellowgreen;
    outline: none;
    cursor: pointer;
    
  }
  &__mode-stab {
    display: block;
    margin-top: 100px;
    margin-left: 16px;
    font-size: 0.8em;
  }
  &__explain {
    font-size: 0.7em;
  }
  &__result-area {
    margin-top: 20px;
  }
  &__result{
    font-size: 1.1em;
    font-weight: bold;
  }
  &__feedback {
    color: crimson;
    font-size: 0.7em;
    transition: 0.5s;
  }
}

/* transition */
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
